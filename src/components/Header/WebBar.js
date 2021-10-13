import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { logOut } from '../../features/user/actions';
import { removeToken } from '../../utils/auth';

const WebBar = ({ status }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = () => {
    history.push('/sign');
  };

  const handleLogout = () => {
    const key = process.env.REACT_APP_TOKEN_KEY;
    removeToken(key);
    dispatch(logOut());
    history.replace('/sign');
  };

  return (
    <Paper
      elevation={1}
      square
      component="header"
      sx={{
        height: '80px',
        position: 'sticky',
        top: '0',
        width: '100%',
        px: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h4">
        REWIND
      </Typography>
      <Button color="inherit" onClick={status ? handleLogout : handleLogin}>
        {status ? 'Logout' : 'Login'}
      </Button>
    </Paper>
  );
};

WebBar.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default WebBar;
