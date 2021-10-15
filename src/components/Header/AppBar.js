import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { logOut } from '../../features/user/actions';
import { loadPosts, changeCategory } from '../../features/posts/actions';
import { removeToken } from '../../utils/auth';

import { ReactComponent as SpringIcon } from '../../assets/spring.svg';
import { ReactComponent as ReactIcon } from '../../assets/react.svg';
import { ReactComponent as NodeIcon } from '../../assets/node.svg';
import { ReactComponent as AllIcon } from '../../assets/all.svg';

const baseURL = process.env.REACT_APP_REMOTE_SERVER_URI;

const TopNevigation = ({ status }) => {
  const [isToggleOpen, setIsToggleOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = () => history.push('/sign');
  const handleLogout = () => {
    const key = process.env.REACT_APP_TOKEN_KEY;
    removeToken(key);
    dispatch(logOut());
    history.replace('/sign');
  };
  const currentCategory = useSelector((state) => state.posts.category);

  const category = ['All', 'React', 'Node', 'Spring'];

  const toggle = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsToggleOpen(open);
  };

  const handleButtonClick = async (language) => {
    const upperCase = language.toUpperCase();
    if (currentCategory === upperCase) {
      return;
    }
    const endpoint = `${baseURL}/posts${
      upperCase === 'ALL' ? '' : `/${upperCase}`
    }/0`;

    const {
      data: { posts },
    } = await axios.get(endpoint);
    console.log(posts);

    const { content, totalElements } = posts;

    dispatch(loadPosts(content, totalElements));
    dispatch(changeCategory(upperCase));
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggle(false)}
      onKeyDown={toggle(false)}
    >
      <List>
        {category.map((language) => (
          <ListItem
            button
            key={language}
            onClick={() => handleButtonClick(language)}
          >
            <ListItemIcon sx={{ width: '36px', height: '36px' }}>
              {language === 'All' && <AllIcon />}
              {language === 'React' && <ReactIcon />}
              {language === 'Node' && <NodeIcon />}
              {language === 'Spring' && <SpringIcon />}
            </ListItemIcon>
            <ListItemText primary={language} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const isMobileView = window.matchMedia('(max-width: 768px)').matches;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            width: '100%',
            height: isMobileView ? '40px' : '120px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#303F9F',
          }}
        >
          <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggle(true)}
            >
              <MenuIcon />
            </IconButton>
            {isMobileView ? (
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={() => history.push('/')}
              >
                Rewind
              </Typography>
            ) : (
              <Typography
                onClick={() => {
                  history.push('/');
                }}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, cursor: 'pointer' }}
              >
                REWIND, REMIND
              </Typography>
            )}
          </div>
          <IconButton
            color="inherit"
            onClick={status ? handleLogout : handleLogin}
          >
            {status ? <LogoutIcon /> : <LoginIcon />}
          </IconButton>
        </Toolbar>
        <SwipeableDrawer
          open={isToggleOpen}
          onClose={toggle(false)}
          onOpen={toggle(true)}
        >
          {list()}
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
};

TopNevigation.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default TopNevigation;
