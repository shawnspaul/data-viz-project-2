import { Chart } from '@antv/g2';
import Card from '@mui/material/Card/Card';
import moment from 'moment';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import rawTweets from './assets/raw_tweets.json';
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
            if (!modGroups.includes(t["luminaries_group_number"])) continue;
            const theDate = moment(t.created_at).format("YYYY-MM-DD")
            if (!d.hasOwnProperty(theDate) || !d[theDate].hasOwnProperty(t["luminaries_group_number"])) {
                d = Object.assign(d,{
                    ...d,
                    [theDate]: {
                        ...d[theDate],
                        [t["luminaries_group_number"]]: 0,
                    }
                });
            }
            d[theDate][t["luminaries_group_number"]]++;
        }

        const data = Object.entries(d).map(([k,v]) => {

            return {
                date: k,
                ...v
            }
        });

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
                max: 300,
            }
        }

        chart.scale(scale)

        chart.render();
        return () => {
            chart.destroy()
        }
    },[modGroups]);

    return <Card><div id="tweets-line-graph"></div></Card>
}

export default TweetsLineGraph