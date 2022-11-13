import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import list from './assets/list.json';
import { v4 as uuidv4 } from 'uuid';


const columns: GridColDef[] = Object.entries(list[0]).map(([key,value]) => {
    const valueLen = value.toString().length;
    const width = (valueLen > 5 ? valueLen : 5) * 15
    return {
        field: key,
        headerName: key,
        width
    }
});

const rows = list.map((i) => ({
    ...i,
    id: uuidv4(),
}));
const LastTweets = () => {

    return  <div style={{ height: '90vh', width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize
            rowsPerPageOptions={[30]}
            density="compact"
        />
    </div>
}

export default LastTweets

