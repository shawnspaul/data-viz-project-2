import { Avatar, AvatarGroup } from '@mui/material';
import React from 'react';
import { getProfileFromHandle } from './LuminairySelector';
import { getModColor } from './State/ModularityGroups';

type Props = {
    users: string[];
    selectUser: Function;
}

const FocusGroupFollowers = (props: Props) => {
    return <AvatarGroup max={20}>
    {props.users.map((u) => {
        const profile = getProfileFromHandle(u); 
        return <Avatar 
            sx={{ width: 30, height: 30, bgcolor: getModColor(profile["luminaries group number"]) }}
            alt={u}
            onClick={() => props.selectUser(u)}
            // sx={{ bgcolor: getModColor(userInfo["luminaries group number"]) }}
        >
            {u[0]}
        </Avatar>
    })}
    </AvatarGroup>
}

export default FocusGroupFollowers