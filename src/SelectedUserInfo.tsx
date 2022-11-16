import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import SelectedUser from './State/SelectedUser';
import list from './assets/list.json';
import network_connections from './assets/network_connections.json';
import { Stack, Avatar, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { getModColor } from './State/ModularityGroups';
import FocusGroupFollowers from './FocusGroupFollowers';
import { getProfileFromHandle } from './LuminairySelector';

const SelectedUserInfo = () => {
    const [ selectedUser, setSelectedUser ] = useRecoilState(SelectedUser);
    const [ userInfo, setUserInfo ] = useState(list[0]);
    const [ followers, setFollowers ] = useState<string[]>([]);
    
    useEffect(() => {
        setUserInfo(getProfileFromHandle(selectedUser as string));
    },[selectedUser]);
    
    useEffect(() => {
        const yo = network_connections.filter((nc) => 
            nc.target === userInfo["handle"]
        );
        setFollowers(() => (
            yo.map((y) => y.source)
        ));
    },[userInfo]);

    if (selectedUser) {
        return <>
            <Stack direction="column" spacing={2}>
                <Avatar 
                    alt={userInfo["user name"]}
                    sx={{ bgcolor: getModColor(userInfo["luminaries group number"]) }}
                >
                    {userInfo["user name"][0]}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                    {userInfo["user name"]}
                </Typography>
                <List aria-label="mailbox folders">
                    <ListItem>
                        <ListItemText 
                            secondary={
                                <FocusGroupFollowers users={followers} selectUser={setSelectedUser} />
                            }
                            primary={"Focus Group Followers"}
                         />
                    </ListItem>
                    <Divider />
                    <ListItem divider>
                        <ListItemText 
                            secondary={userInfo["followers"]}
                            primary={"Followers"}
                            />
                    </ListItem>
                    <ListItem divider>
                        <ListItemText 
                            secondary={userInfo["following"]}
                            primary={"Following"}
                            />
                    </ListItem>
                    <ListItem>
                        <ListItemText 
                            secondary={userInfo["tweets"]}
                            primary="Total Tweets" 
                        />
                    </ListItem>
                    <Divider />
                    <ListItem divider>
                        <ListItemText 
                            secondary={userInfo["betweeness centrality"]}
                            primary="Centrality" 
                        />
                    </ListItem>
                </List>
            </Stack>
        </>
    }
    return <></>
}

export default SelectedUserInfo;