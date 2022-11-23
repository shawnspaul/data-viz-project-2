import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

type Props = {
    data: any[];
}

const Table = (props: Props) => {
    const [ columns, setColumns ] = useState<GridColDef[]>([]);
    const [ rows, setRows ] = useState<any[]>([]);

    React.useEffect(() => {
        if (props.data.length > 0) {
            const c: GridColDef[] = Object.entries(props.data[0]).map(([key,value]) => {
                const valueLen = value?.toString().length || 0;
                const width = (valueLen > 5 ? valueLen : 5) * 15
                return {
                    field: key,
                    headerName: key,
                    width
                }
            });
            
            const r = props.data.map((i) => ({
                ...i,
                id: uuidv4(),
            }));
            setColumns(c);
            setRows(r);
        } else {
            setColumns([]);
            setRows([]);
        }
    },[props.data]);


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

