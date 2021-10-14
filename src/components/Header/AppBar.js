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
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SwipeableDrawer } from '@mui/material';

import { logOut } from '../../features/user/actions';
import { loadPosts, changeCategory } from '../../features/posts/actions';
import { removeToken } from '../../utils/auth';

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

  const category = ['React', 'Node', 'Spring'];

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

    const {
      data: { posts },
    } = await axios.get(`${baseURL}/posts/${upperCase}/0`);
    const { content } = posts;

    dispatch(loadPosts(content));
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
            <ListItemText primary={language} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            width: '100%',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
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
          <Typography
            onClick={() => {
              history.push('/');
            }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            REWIND, REMIND
          </Typography>
          <Button color="inherit" onClick={status ? handleLogout : handleLogin}>
            {status ? 'Logout' : 'Login'}
          </Button>
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
