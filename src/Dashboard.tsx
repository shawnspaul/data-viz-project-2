import { 
    Grid, 
    // Paper, 
    // Table 
} from '@mui/material'
import React from 'react'
import NetworkGraph from './NetworkGraph'
// import WordCloud, { Word } from './WordCloud'
import ModularitySelect from './ModularitySelect';
// import { useRecoilValue } from 'recoil';
// import ModularityGroup from './State/ModularityGroups';
// import { getLum } from './LuminairySelector';
import SelectedUserInfo from './SelectedUserInfo';
import TweetsLineGraph from './TweetsLineGraph';

const Dashboard = () => {
    // const modGroup = useRecoilValue(ModularityGroup);
    // const [ words, setWords ] = React.useState<Word[]>([]);

    // React.useEffect(() => {
    //     const words = getLum(modGroup.id, modGroup.anchor_words);
    //     setWords(() => {
    //         return Object.entries(words).map(([k,v]) => {
    //             return {
    //                 value: k,
    //                 count: v.count
    //             }
    //         })
    //     });
    // },[modGroup]);
    
    return <>
        <Grid container spacing={2}>
            <Grid xs={4}>
                <ModularitySelect/>
            </Grid>
            <Grid xs={8}>
                <SelectedUserInfo/>
            </Grid>
            <Grid xs={6}>
                <NetworkGraph/>
            </Grid>
            <Grid xs={8}>
                <TweetsLineGraph/>
                {/* <WordCloud words={words}/> */}
            </Grid>
        </Grid>
    </>
}

export default Dashboard