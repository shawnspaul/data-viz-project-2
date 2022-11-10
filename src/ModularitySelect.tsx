import * as React from 'react';
import { useRecoilState } from 'recoil';
import ModularityGroup, { getModColor, ModGroups } from './State/ModularityGroups';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const ModularitySelect = () => {
    const [ modGroup, setModGroup ] = useRecoilState(ModularityGroup);
    const buttons = ModGroups.map(mg => 
        <ToggleButton value={mg}>
            <FiberManualRecordIcon style={{ color: mg.color}} />{mg.title}
        </ToggleButton>
    );

    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={modGroup}
            exclusive
            onChange={(_, value) => value ? setModGroup(value) : null}
            aria-label="text alignment"
        >
            {buttons}
        </ToggleButtonGroup>
    );
}

export default ModularitySelect;