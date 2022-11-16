import { Chart } from '@antv/g2';
import moment from 'moment';
import { useEffect } from 'react';
import rawTweets from './assets/raw_tweets.json';

type ugh = {
    [date: string]: number
}
const TweetsLineGraph = () => {

    useEffect(() => {
        const d: ugh = {};

        for (let t of rawTweets) {
            const theDate = moment(t.created_at).format("YYYY-MM-DD")
            if (!d.hasOwnProperty(theDate)) {
                d[theDate] = 0
            }
            d[theDate]++;
        }

        const data = Object.entries(d).map(([k,v]) => {
            return {
                date: k,
                tweets: v
            }
        });

        const chart = new Chart({
          container: 'tweets-line-graph',
          autoFit: true,
          height: 200,
          width: 300,
          syncViewPadding: true,
        });
        chart.data(data);
    
        chart.line().position('date*tweets');
        chart.render();
        return () => {
            chart.destroy()
        }
    },[]);

    return <div id="tweets-line-graph"></div>
}

export default TweetsLineGraph