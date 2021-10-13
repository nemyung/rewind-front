import React from 'react';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import LoadingButton from '@mui/lab/LoadingButton';

import LoginIcon from '@mui/icons-material/Login';
import PasswordIcon from '@mui/icons-material/Password';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';

import { validateInput } from '../utils';
import { loginToServer } from '../features/user/actions';

const Login = ({ toggle = noop }) => {
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  // const history = useHistory();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const invalidationMessage = validateInput(email, pw);
    if (validateInput(email, pw)) {
      console.log('----------validation실패----------');
      console.log(invalidationMessage); // TODOS 오류메세지 뿌리기
      console.log('---------------------------------');
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(loginToServer(email, pw));
      setIsLoading(false);
      // history.replace('/');
    } catch (error) {
      console.log('axios 실패 대비...');
      console.error(error);
    }
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
