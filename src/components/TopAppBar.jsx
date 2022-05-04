import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer,  List, ListItem, ListItemText, ListItemIcon, Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../features/login'


export default function TopAppBar() {
  const [open, setOpen] = React.useState()
  const user = useSelector(state => state.login).login
  const dispatch = useDispatch()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary' enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => { setOpen(true) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bar
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={open}
        onClose={()=>{setOpen(false)}}
      >
        <div style={{width:'250px', padding:'15px'}}>
          <div style={{ alignItems: 'center', marginLeft:'auto', marginRight:'auto', textAlign:'center' }}>
            <Avatar sx={{ alignSelf: 'center', marginLeft: 'auto', marginRight: 'auto' }}>{user.Nome[0]}{user.Cognome[0]}</Avatar>
            <p>{user.Nome} {user.Cognome}</p>
            <p>{user.Email }</p>
            <p>{user.NomeScuola}</p>
            <p>{user.Classe }</p>
          </div>
        </div>
        <hr />
        <List>
          <ListItem button onClick={()=>{dispatch(logout())}}>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
