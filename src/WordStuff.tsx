import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WordCloud, { Word } from './WordCloud';
import tweet_list from './assets/new_raw_tweets.json';
import { Grid, MenuItem, Paper, Typography, Select } from '@mui/material';
import topics from './assets/topics.json';
import Table from './Table';
import { getModColor } from './State/ModularityGroups';
import { getLum } from './LuminairySelector';
import { useNavigate } from 'react-router-dom';

const WordStuff = () => {
    const { topic } = useParams();
    const [ tweets, setTweets ] = useState(tweet_list);
    const [ topicInfo, setTopicInfo ] = useState(topics[0]);
    const [ anchorWords, setAnchorWords ] = useState<string[]>([]);
    const [ hashTags, setHashTags ] = useState<string[]>([]);
    const [ ar, setAr ] = useState<Word[]>([]);
    const [ hr, setHr ] = useState<Word[]>([]);
    const navigate = useNavigate();

    if (topic === '-1') {
        navigate('/dashboard');
    }

    useEffect(() => {
        setTweets(() => tweet_list.filter(t => t.topic_num === parseInt(topic as any) as any) as any);
        //@ts-ignore
        setTopicInfo(topics.find(t => t['Topic Number'] === parseInt(topic)));
    },[topic]);

    useEffect(() => {
        if (topicInfo) { 
            setAnchorWords(topicInfo["Topic Label"].split("_"));
            try {
                const replaced = topicInfo["Top Hashtags"].replaceAll(`'`, `"`);
                setHashTags(JSON.parse(replaced));
            } catch (e) {
                console.log(e)
            }
        }
    },[topicInfo]);

    useEffect(() => {
        const res = getLum(parseInt(topic as any), anchorWords);
        setAr(() => Object.entries(res).map(([k,v]) => ({ value: k, count: v.count})));
    },[anchorWords]);

    useEffect(() => {
        const res = getLum(parseInt(topic as any), hashTags);
        setHr(() => Object.entries(res).map(([k,v]) => ({ value: k, count: v.count})));
    },[hashTags]);

    return <>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Typography variant="h5">Topic&nbsp;
                    <Select 
                        value={topic} 
                        onChange={(e:any) => navigate(`/wordcloud/${e.target.value}`)}
                    >
                        {topics.map(t => <MenuItem value={t["Topic Number"]}>{t["Topic Number"]}</MenuItem>)}
                    </Select>
                </Typography>
            </Grid>
            <Grid item xs={4} spacing={2}>
                Top Words
                <Paper>
                    <WordCloud words={ar}/>
                </Paper>
            </Grid>
            <Grid item xs={4} spacing={2}>
                Top Hashtags
                <Paper>
                    <WordCloud words={hr}/>
                </Paper>
            </Grid>
            <Grid item xs={12} spacing={2}>
                <Table data={tweets.map(ut => ({
                    //@ts-ignore
                    "__color__": getModColor(ut["luminaries group number"]),
                    "Date": ut.tweet_date,
                    "Luminary Group": ut['Luminary Group Name'],
                    "Tweet": ut.tweet_text,
                }))}/>
            </Grid>
        </Grid>
    </>
}

export default WordStuff;