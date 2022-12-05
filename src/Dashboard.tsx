import {
    Grid,
} from '@mui/material'
import React from 'react'
import NetworkGraph from './NetworkGraph'
import ModularitySelect from './ModularitySelect';
import SelectedUserInfo from './SelectedUserInfo';
import TweetsLineGraph from './TweetsLineGraph';

const Dashboard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ModularitySelect/>
            </Grid>
            <Grid item xs={6} spacing={2}>
                <NetworkGraph/>
                <TweetsLineGraph/>
            </Grid>
            <Grid item xs={6} spacing={2}>
              <SelectedUserInfo/>
            </Grid>

        </Grid>
    );
}

export default Dashboard
