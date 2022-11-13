import { Paper, Table } from '@mui/material'
import React from 'react'
import NetworkGraph from './NetworkGraph'
import WordCloud, { Word } from './WordCloud'
import ModularitySelect from './ModularitySelect';
import { useRecoilValue } from 'recoil';
import ModularityGroup from './State/ModularityGroups';
import { getLum } from './LuminairySelector';

const Dashboard = () => {
    const modGroup = useRecoilValue(ModularityGroup);
    const [ words, setWords ] = React.useState<Word[]>([]);

    React.useEffect(() => {
        const words = getLum(modGroup.id, modGroup.anchor_words);
        setWords(() => {
            return Object.entries(words).map(([k,v]) => {
                return {
                    value: k,
                    count: v.count
                }
            })
        });
    },[modGroup]);
    
    return <>
        <ModularitySelect/>
            <div style={{ width: '20%' }}>
                <Paper>
                    <WordCloud words={words}/>
                </Paper>
            </div>
            <div style={{ width: '50%' }}>
                <Paper>
                    <NetworkGraph/>
                </Paper>
            </div>
        <Table/>
    </>
}

export default Dashboard