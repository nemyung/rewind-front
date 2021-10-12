import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import useValidation from '../hooks/useValidation';

import { validateEmail, matchPasswordLength } from '../utils';

const Signup = ({ toggle = noop }) => {
  const [email, , onEmailChange, isEmailValid] = useValidation(
    validateEmail,
    '',
  );

  const [pw, , onPwChange, isPwEnoughLength] = useValidation(
    matchPasswordLength,
    '',
  );

  const [pwAgain, , onPwAgainChange, isPwAgainEnoughLength] = useValidation(
    matchPasswordLength,
    '',
  );

  const [nickname, setNickname] = React.useState('');

  const isTabletView = window.matchMedia('(min-width: 768px)').matches;

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          maxWidth: '414px',
        }}
      >
        <Box
          sx={{
            width: isTabletView ? '100%' : '80%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            label="이메일"
            error={isEmailValid}
            type="email"
            value={email}
            margin="dense"
            size={isTabletView ? 'normal' : 'small'}
            onChange={(e) => onEmailChange(e.target.value)}
            fullWidth
          />
          <LoadingButton
            // loading={isLoading}
            variant="outlined"
            sx={{
              width: `${isTabletView ? 'auto' : '100%'}`,
              alignSelf: 'flex-end',
            }}
          >
            중복 확인
          </LoadingButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: isTabletView ? '100%' : '80%',
            margin: '0 auto',
            marginTop: '1.125rem',
          }}
        >
          <TextField
            label="비밀번호"
            error={isPwEnoughLength}
            type="password"
            size={isTabletView ? 'normal' : 'small'}
            value={pw}
            onChange={(e) => onPwChange(e.target.value)}
            fullWidth
          />
        </Box>
        <Box
          sx={{
            marginTop: '0.5rem',
            width: isTabletView ? '100%' : '80%',
            margin: '0 auto',
          }}
        >
          <TextField
            label="비밀번호 확인"
            type="password"
            value={pwAgain}
            error={isPwAgainEnoughLength}
            margin="dense"
            size={isTabletView ? 'normal' : 'small'}
            fullWidth
            onChange={(e) => onPwAgainChange(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            width: isTabletView ? '100%' : '80%',
            margin: '1.25rem auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            label="닉네임"
            type="text"
            value={nickname}
            margin="dense"
            size={isTabletView ? 'normal' : 'small'}
            onChange={(e) => setNickname(e.target.value)}
            fullWidth
          />
          <LoadingButton
            // loading={isLoading}
            variant="outlined"
            // size="small"
            // onClick={handleFormSubmit}
            sx={{
              width: `${isTabletView ? 'auto' : '100%'}`,
              alignSelf: 'flex-end',
            }}
          >
            중복 확인
          </LoadingButton>
        </Box>
        <Box
          sx={{
            width: `${isTabletView ? '100%' : '80%'}`,
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 auto',
            marginTop: '1.25rem',
          }}
        >
          <LoadingButton variant="outlined" size="large" onClick={toggle}>
            뒤로 가기
          </LoadingButton>
          <Button variant="contained" size="large" onClick={handleFormSubmit}>
            가입하기
          </Button>
        </Box>
      </Box>
    </>
  );
};

Signup.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Signup;
