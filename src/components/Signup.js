import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import useValidation from '../hooks/useValidation';
import useDuplicationCheck from '../hooks/useDuplicationCheck';
import useSignup from '../hooks/useSignup';
import useInput from '../hooks/useInput';
import { isAllTrue } from '../utils';

const Signup = ({ toggle = noop }) => {
  const [email, isEmailValid, onEmailChange] = useValidation('email', '');
  const [emailLoading, emailFailMessage, emailSuccessMessage, checkEmail] =
    useDuplicationCheck('id');

  const [pw, isPwValid, onPwChange] = useValidation('password', '');
  const [pwAgain, isPwAgainValid, onPwAgainChange] = useValidation(
    'password',
    '',
  );

  const [nickname, onNicknameChange] = useInput('');
  const [
    nicknameLoading,
    nicknameFailMessage,
    nicknameSuccessMessage,
    checkNickname,
  ] = useDuplicationCheck('nickname');

  const [submitLoading, formErrorMessage, signUp] = useSignup(toggle);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    signUp(email, pw, pwAgain, nickname);
  };

  const isTabletView = window.matchMedia('(min-width: 768px)').matches;
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
            fullWidth
            label="이메일"
            type="email"
            value={email}
            margin="dense"
            size={isTabletView ? 'normal' : 'small'}
            onChange={(e) => onEmailChange(e.target.value)}
            error={!isEmailValid}
            helperText={!isEmailValid && '유효하지 않은 이메일 형식입니다.'}
          />
          <Stack
            direction={{ xs: 'column', sm: 'row-reverse' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <LoadingButton
              onClick={() => checkEmail(email)}
              loading={emailLoading}
              variant="outlined"
              disabled={!email}
              sx={{
                width: `${isTabletView ? 'auto' : '100%'}`,
                alignSelf: 'flex-end',
                mb: 1,
              }}
            >
              중복 확인
            </LoadingButton>
            {emailFailMessage ? (
              <ErrorMessage>{emailFailMessage}</ErrorMessage>
            ) : (
              <SuccessMessage>{emailSuccessMessage}</SuccessMessage>
            )}
          </Stack>
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
            error={!isPwValid}
            type="password"
            size={isTabletView ? 'normal' : 'small'}
            value={pw}
            onChange={(e) => onPwChange(e.target.value)}
            helperText={
              !isPwValid && '6자 이상 20자 이하의 비밀번호를 작성해주세요.'
            }
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
            error={!isPwAgainValid}
            margin="dense"
            size={isTabletView ? 'normal' : 'small'}
            fullWidth
            onChange={(e) => onPwAgainChange(e.target.value)}
            helperText={
              !isPwAgainValid && '비밀번호는 6자 이상 20자 이하입니다.'
            }
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
            onChange={onNicknameChange}
            fullWidth
          />
          <Stack
            direction={{ xs: 'column', sm: 'row-reverse' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <LoadingButton
              loading={nicknameLoading}
              variant="outlined"
              disabled={!nickname}
              onClick={() => checkNickname(nickname)}
              sx={{
                width: `${isTabletView ? 'auto' : '100%'}`,
                alignSelf: 'flex-end',
                mb: 1,
              }}
            >
              중복 확인
            </LoadingButton>
            {nicknameFailMessage ? (
              <ErrorMessage>{nicknameFailMessage}</ErrorMessage>
            ) : (
              <SuccessMessage>{nicknameSuccessMessage}</SuccessMessage>
            )}
          </Stack>
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
          <LoadingButton
            variant="contained"
            size="large"
            onClick={handleFormSubmit}
            loading={submitLoading}
            disabled={
              !isAllTrue(
                isEmailValid,
                emailSuccessMessage,
                isPwValid,
                isPwAgainValid,
                nicknameSuccessMessage,
                !formErrorMessage,
              )
            }
          >
            가입하기
          </LoadingButton>
        </Box>
        <Box sx={{ textAlign: 'center', my: 2 }}>
          {formErrorMessage && <ErrorMessage>{formErrorMessage}</ErrorMessage>}
        </Box>
      </Box>
    </>
  );
};

Signup.propTypes = {
  toggle: PropTypes.func.isRequired,
};

const ErrorMessage = styled.small`
  font-size: 12px;
  color: #d32f2f;
`;

const SuccessMessage = styled(ErrorMessage)`
  color: #009688;
`;

export default Signup;
