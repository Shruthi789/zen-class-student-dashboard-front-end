import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import {studentContext} from './Home.js';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const history=useHistory();
  const {info,url}=React.useContext(studentContext);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
       {['Profile', 'Settings', 'Activity Log'].map((text, index) => (
            <MenuItem onClick={handleMenuClose} key={index}>
              <ListItemIcon>
                {index === 0 ? <PersonIcon /> : index === 1? <SettingsIcon/>:<FormatListBulletedIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </MenuItem>
          ))}
          <Divider/>
          <MenuItem onClick={()=>{history.push('/')}}>
              <ListItemIcon>
                 <LogoutIcon/>
              </ListItemIcon>
              <ListItemText>
                  Log out
              </ListItemText>
            </MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
           <Avatar alt="Student" src="https://th.bing.com/th/id/R.7f59daf5cec341da0156e18d99dcfbc2?rik=JIyj4xWUmd%2f4qQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_458461.png&ehk=f4BplXTCGbevaKF6cj7h0F%2b3AmvNIZ1uh1qSHHffCvo%3d&risl=&pid=ImgRaw&r=0" />
        </IconButton>
        <p>{localStorage.getItem('name')}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{padding:'0px'}}>
        <div className="app-bar">
        <Button variant="text" color="warning" onClick={()=>{history.push(`${url}`)}}>STUDENT INFO</Button>
        <Button variant="text" color="warning" onClick={()=>{history.push(`${url}/edit/${info._id}`)}}>EDIT STUDENT INFO</Button>
        </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div className="org">
            <h5 className='avatar-name'>{localStorage.getItem('name')}</h5>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <Avatar alt="Student" src="https://th.bing.com/th/id/R.7f59daf5cec341da0156e18d99dcfbc2?rik=JIyj4xWUmd%2f4qQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_458461.png&ehk=f4BplXTCGbevaKF6cj7h0F%2b3AmvNIZ1uh1qSHHffCvo%3d&risl=&pid=ImgRaw&r=0" />
            </IconButton>
            </div>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
               <MoreIcon htmlColor="beige"/>
            </IconButton>
          </Box>
        </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export {PrimarySearchAppBar};