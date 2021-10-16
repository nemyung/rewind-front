/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import React from 'react';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
import { login as loginAction } from '../features/user/actions';
import { saveToken } from '../utils/auth';

import kakaoLoginSrc from '../assets/kakao-login.png';

const baseURL = process.env.REACT_APP_REMOTE_SERVER_URI;

const Login = ({ toggle = noop }) => {
  const [email, handleEmailChange] = useInput('');
  const [pw, handlePwChange] = useInput('');
  const [loading, failMessage, login] = useLogin();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    login(email, pw);
  };

  React.useEffect(() => {
    if (!location.search) {
      return null;
    }
    const query = location.search;
    const code = query.split('=')[1];

    async function handleKaKaoLoginRedirection() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${baseURL}/kakao/callback?code=${code}`,
        });
        saveToken(data.token);
        dispatch(loginAction({ email: data.email, nickname: data.nickname }));
        history.replace('/');
      } catch (error) {
        console.error(error);
      }
    }
    handleKaKaoLoginRedirection();
  }, []);

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextField
        type="email"
        value={email}
        onChange={handleEmailChange}
        margin="normal"
        fullWidth
        sx={{
          width: '100%',
          maxWidth: '300px',
        }}
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
        sx={{
          width: '100%',
          maxWidth: '300px',
        }}
      />
      <LoadingButton
        loading={loading}
        variant="outlined"
        onClick={handleFormSubmit}
        sx={{
          width: '100%',
          maxWidth: '300px',
          height: '45px',
          margin: '16px 0 4px 0',
        }}
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
        // fullWidth
        startIcon={<DirectionsBoatFilledIcon />}
        sx={{
          maxWidth: '300px',
          width: '100%',
          height: '45px',
          margin: '8px 0 16px 0',
        }}
      >
        회원가입하기
      </Button>
      <Button
        variant="contained"
        component="a"
        fullWidth
        onClick={() => {
          window.location.href = `${process.env.REACT_APP_KAKAO_PATH}`;
        }}
        sx={{
          backgroundColor: '#FFC107!important',
          color: '#212121',
          background: `url(${kakaoLoginSrc})`,
          backgroundSize: 'cover',
          width: '300px',
          height: '45px',
          margin: '0 auto',
        }}
      >
        {/* 카카오로 로그인하기 */}
      </Button>
    </Box>
  );
};

Login.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Login;
