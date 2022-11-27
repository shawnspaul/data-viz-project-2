import { Chart } from '@antv/g2';
import Card from '@mui/material/Card/Card';
import Typography from '@mui/material/Typography/Typography';
import moment from 'moment';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import rawTweets from './assets/new_raw_tweets.json';
import { ModGroupsSelector, getModColor } from './State/ModularityGroups';

type ugh = {
    [date: string]: {
        [modGroup: number]: number,
    }
}
const TweetsLineGraph = () => {
    const modGroups = useRecoilValue(ModGroupsSelector);
    useEffect(() => {
        let d: ugh = {};

        for (let t of rawTweets) {
            if (modGroups.includes(t["luminaries group number"] as number)) {
                const theDate = moment(t.tweet_date).format("YYYY-MM-DD")
                if (!d.hasOwnProperty(theDate)) {
                    d[theDate] = {};
                    for (let mg of modGroups) {
                        d[theDate][mg] = 0;
                    }
                }
                d[theDate][t["luminaries group number"] as number]++;
            }
        }

        let data = Object.entries(d).map(([k,v]) => {
            return {
                date: k,
                ...v
            }
        });

        data = data.sort((a,b) => moment(a.date) > moment(b.date) ? 1 : -1);

        const chart = new Chart({
          container: 'tweets-line-graph',
          autoFit: true,
          height: 300,
          padding: 50,
          syncViewPadding: true,
        });
        chart.data(data);

        let scale:any = {}
        for (let mg of modGroups) {
            chart.line().position(`date*${mg}`).color(getModColor(mg));
            scale[mg] = {
                min: 0,
                max: 200,
            }
        }

        chart.scale(scale)

        chart.render();
        return () => {
            chart.destroy()
        }
    },[modGroups]);

    return <Card>
        <Typography variant="h5" style={{ margin: 5 }}>Number of Tweets by Day</Typography>
        <div id="tweets-line-graph"></div>
    </Card>
}

export default TweetsLineGraph