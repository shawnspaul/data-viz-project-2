import { List, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, ListItemButton, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ModularitySelect from './ModularitySelect';
import SelectedUserInfo from './SelectedUserInfo';
import { getModColor, ModGroupUsers } from './State/ModularityGroups';
import SelectedUser from './State/SelectedUser';

const Ranks = () => {
  const [selectedIndex, setSelectedIndex] = React.useState('');
  const setSelectedUser = useSetRecoilState(SelectedUser);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string,
  ) => {
    setSelectedIndex(index);
    setSelectedUser(index);
  };

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
        me.sort((a:any,b:any) => 
            //@ts-ignore
            (parseInt((a[field] as string).toString().replace(/,/g, ''), 10) < parseInt((b[field] as string).toString().replace(/,/g, ''), 10)) ? 1 : -1
        );
        setList(me)
    },[modGroupUsers, field]);
    
    return <>
    <Grid container spacing={2}>
            <Grid item xs={12} spacing={2}>
                <ModularitySelect/>
      <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{ position: 'relative', zIndex: 100 }}
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
            </Grid>
            <Grid item xs={3} spacing={2} style={{ height: '85vh', overflowY: "scroll"}}>
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
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {list.map((l) => <>
                  <ListItemButton 
                    alignItems="flex-start"
                    selected={selectedIndex === l["handle"]}
                    onClick={(event) => handleListItemClick(event, l["handle"])}
                  >
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
                              {
                                //@ts-ignore
                                l[field] + " " + field
                              }
                            </Typography>
                        </React.Fragment>
                        }
                    />
                  </ListItemButton>
                  <Divider variant="inset" component="li" />
                  </>)
                }
            </List>
            </Grid>
            <Grid item xs={9} spacing={2} style={{ height: '85vh', overflowY: "scroll"}}>
                <SelectedUserInfo/>
            </Grid>
        </Grid>
    
    </>
}

export default Ranks;