import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import WordCloud, { Word } from './WordCloud';
import { getLum } from './LuminairySelector';
import { Paper } from '@mui/material';
import ModularitySelect from './ModularitySelect';
import { useRecoilValue } from 'recoil';
import ModularityGroup from './State/ModularityGroups';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


export default function App() {
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

    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <ModularitySelect/>
                <div style={{ width: '20%' }}>
                    <Paper>
                       <WordCloud words={words}/>
                    </Paper>
                </div>
            </Box>
        </Box>
    );
}
