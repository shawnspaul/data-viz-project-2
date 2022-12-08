import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import users from './assets/list.json';
import tweets from './assets/new_raw_tweets.json';
import topics from './assets/topics.json';
import { v4 as uuidv4 } from 'uuid';
import { Box, Tabs, Tab, Typography } from '@mui/material';

const files = [ 
    users, 
    tweets,
    topics
];

const titles = [
    'users',
    'tweets',
    'topics',
];

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DataFiles = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const columns: GridColDef[] = Object.entries(files[value][0]).map(([key,value]) => {
        const valueLen = value.toString().length;
        const width = (valueLen > 5 ? valueLen : 5) * 15
        return {
            field: key,
            headerName: key,
            width
        }
    });
    
    const rows = files[value].map((i) => ({
        ...i,
        id: uuidv4(),
    }));

    return <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {files.map((_,i) => <Tab label={titles[i]} {...a11yProps(i)} />)}
            </Tabs>
        </Box>
        <TabPanel value={value} index={value}>
            <div style={{ height: '90vh', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoPageSize
                    rowsPerPageOptions={[30]}
                    density="compact"
                />
            </div>
        </TabPanel>
    </>;
}

export default DataFiles

