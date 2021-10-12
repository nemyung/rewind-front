import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import LoadingButton from '@mui/lab/LoadingButton';

import LoginIcon from '@mui/icons-material/Login';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';

const Login = ({ toggle = noop }) => {
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log('hi');
    console.log(email, pw);
  };

  return (
    <Box component="form" autoComplete="off">
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type="password"
        value={pw}
        fullWidth
        onChange={(e) => setPw(e.target.value)}
        margin="dense"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        loading={isLoading}
        variant="outlined"
        onClick={handleFormSubmit}
        sx={{ width: '100%', margin: '16px 0' }}
        startIcon={<LoginIcon />}
      >
        로그인 하기
      </LoadingButton>
      <Button
        variant="contained"
        onClick={toggle}
        fullWidth
        startIcon={<DirectionsBoatFilledIcon />}
      >
        회원가입하기
      </Button>
    </Box>
  );
};

Login.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Login;
