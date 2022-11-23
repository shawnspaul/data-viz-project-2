import * as React from 'react';
import { useRecoilState } from 'recoil';
import ModularityGroup, { ModGroup, ModGroups } from './State/ModularityGroups';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const ModularitySelect = () => {
    const [ modGroups, setModGroups ] = useRecoilState(ModularityGroup);

  const onChange = (
    _: React.MouseEvent<HTMLElement>,
    gs: ModGroup[],
  ) => {
    setModGroups(gs);
  };
    const buttons = ModGroups.map(mg => 
        <ToggleButton value={mg}>
            <FiberManualRecordIcon style={{ color: mg.color}} />{mg.title}
        </ToggleButton>
    );

    return (
        <ToggleButtonGroup
            orientation="horizontal"
            value={modGroups}
            onChange={onChange}
            // onChange={(_, value) => value ? setModGroup(value) : null}
            aria-label="text alignment"
        >
            {buttons}
        </ToggleButtonGroup>
    );
}

export default ModularitySelect;