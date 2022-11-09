import * as React from 'react';
import { useRecoilState } from 'recoil';
import ModularityGroup, { ModGroups } from './State/ModularityGroups';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const ModularitySelect = () => {
    const [ modGroup, setModGroup ] = useRecoilState(ModularityGroup);
    const buttons = ModGroups.map(mg => <ToggleButton value={mg}>{mg.title}</ToggleButton>);

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