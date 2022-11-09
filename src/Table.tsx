import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import list from './assets/list.json';
import { v4 as uuidv4 } from 'uuid';

const c: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

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
const Table = () => {

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

export default Table

