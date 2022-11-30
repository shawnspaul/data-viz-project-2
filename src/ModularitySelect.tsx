import * as React from 'react';
import { useRecoilState } from 'recoil';
import ModularityGroup, { ModGroups } from './State/ModularityGroups';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

const ModularitySelect = () => {
    const [ modGroups, setModGroups ] = useRecoilState(ModularityGroup);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>, checked: boolean
  ) => {
    let mg = Object.assign([],modGroups);
    if (checked) {
      mg.push(parseInt(event.target.value) as any)
    } else {
      const index = mg.findIndex((m) => m === parseInt(event.target.value) as any);
      if (index > -1) {
        mg.splice(index, index + 1);
      }
    }
    setModGroups(mg);
  };
    const buttons = ModGroups.map(mg => 
            <FormControlLabel
              control={
                <Checkbox 
                  checked={modGroups.includes(mg.id)} 
                  style={{color: mg.color}}
                  value={mg.id}
                  size="small"
                  onChange={onChange}
                />
              }
              label={mg.title}
            />
    );

    return (
      <FormControl sx={{ m: 3 }} component="fieldset" variant="filled">
          <FormGroup row>
            {buttons}
          </FormGroup>
        </FormControl>
    )
}

export default ModularitySelect;