import React from 'react';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import LoadingButton from '@mui/lab/LoadingButton';

import LoginIcon from '@mui/icons-material/Login';
import PasswordIcon from '@mui/icons-material/Password';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import { ErrorMessage } from './Signup';
import { useInput, useLogin } from '../hooks';

const Login = ({ toggle = noop }) => {
  const [email, handleEmailChange] = useInput('');
  const [pw, handlePwChange] = useInput('');
  const [loading, failMessage, login] = useLogin();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    login(email, pw);
  };

  return (
    <Box component="form" autoComplete="off">
      <TextField
        type="email"
        value={email}
        onChange={handleEmailChange}
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
        onChange={handlePwChange}
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
        loading={loading}
        variant="outlined"
        onClick={handleFormSubmit}
        sx={{ width: '100%', margin: '16px 0 8px 0' }}
        startIcon={<LoginIcon />}
      >
        로그인 하기
      </LoadingButton>
      {failMessage && (
        <Box sx={{ textAlign: 'center', my: 1 }}>
          <ErrorMessage>{failMessage}</ErrorMessage>
        </Box>
      )}
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
