import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Documentation from './Documentation';
import { Route, Routes } from 'react-router';
import Dashboard from './Dashboard';
import LastTweets from './LastTweets';
import Ranks from './Ranks';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


export default function App() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/ranks" element={<Ranks />} />
                  <Route path="/documentation" element={<Documentation/>} />
                  <Route path="/last-tweets" element={<LastTweets/>} />
                </Routes>
            </Box>
        </Box>
    );
}
