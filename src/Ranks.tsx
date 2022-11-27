import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ModularitySelect from './ModularitySelect';
import { getModColor, ModGroupUsers } from './State/ModularityGroups';

const Ranks = () => {
    const modGroupUsers = useRecoilValue(ModGroupUsers);
    const [ list, setList ] = useState(modGroupUsers);
    const [ field, setField ] = useState('tweets');
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event: Event | React.SyntheticEvent) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    useEffect(() => {
        let me: any = []; 
        Object.assign(me,modGroupUsers);
        const lol = me.sort((a:any,b:any) => 
            //@ts-ignore
            (a[field] > b[field]) ? 1 : -1
        );
        setList(lol)
    },[modGroupUsers, field]);
    
    return <>
    <ModularitySelect/>
    <Button
        style={{ margin: 5 }}
        size="small"
        variant="outlined"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Rank by {field}
      </Button>
      <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={(e)=>{handleClose(e);setField('tweets per day');}}>Tweets Per Day</MenuItem>
                    <MenuItem onClick={(e)=>{handleClose(e);setField('followers');}}>Followers</MenuItem>
                    <MenuItem onClick={(e)=>{handleClose(e);setField('followers from focus group');}}>Followers from Focus Group</MenuItem>
                    <MenuItem onClick={(e)=>{handleClose(e);setField('favorites');}}>Favorites</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {list.map(l => <><ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar 
                    alt={l["user name"]}
                    sx={{ bgcolor: getModColor(l["luminaries group number"]) }}
                >
                    {l["user name"][0]}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={l["user name"]}
                secondary={
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        >
                        {l["user bio"]}
                    </Typography>
                </React.Fragment>
                }
            />
            </ListItem>
            <Divider variant="inset" component="li" />
            </>)}
        </List>
    </>
}

export default Ranks;