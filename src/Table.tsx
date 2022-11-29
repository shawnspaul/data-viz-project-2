import * as React from 'react';
import TB from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

type Props = {
    data: any[];
}

const Table = (props: Props) => {
    if (props.data.length < 1) {
        return <></>;
    }
    return  <div style={{ height: '90vh', width: '100%' }}>
        <TB sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {Object.keys(props.data[0]).map((k) => {
                        return <TableCell>{k === '__color__' ? '' : k}</TableCell>;
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
            {props.data.map((row) => (
                <TableRow>
                    {Object.entries(row).map(([k,v]) => {
                        //@ts-ignore
                        return <TableCell component="th" scope="row">{k === '__color__' ? <FiberManualRecordIcon style={{ color: v}}/> : v}</TableCell>
                    })}
                    
                </TableRow>
            ))}
            </TableBody>
        </TB>
    </div>
}

export default Table

