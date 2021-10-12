import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
// import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import useValidation from '../hooks/useValidation';
import {
  isAllTrue,
  validateEmail,
  matchPasswordLength,
  validateInput,
} from '../utils';

const Signup = ({ toggle = noop }) => {
  const [email, , onEmailChange, isEmailValid] = useValidation(
    validateEmail,
    '',
  );
  const [emailLoading, setEmailLoading] = React.useState(false);

  const [pw, , onPwChange, isPwEnoughLength] = useValidation(
    matchPasswordLength,
    '',
  );

  const [pwAgain, , onPwAgainChange, isPwAgainEnoughLength] = useValidation(
    matchPasswordLength,
    '',
  );

  const [nickname, setNickname] = React.useState('');
  const [nicknameLoading, setNicknameLoading] = React.useState(false);

  const isTabletView = window.matchMedia('(min-width: 768px)').matches;

  const handleDuplicateCheck = async (type, input, toggleFn) => {
    toggleFn(true);

    console.log(type, input, toggleFn);
    console.log({ [type]: input }); // done
    const result = 'success';
    // const url = `/signup_duplicate_${type}`;

    try {
      // const res = await axios.post(url, { [type]: input });
      // const {
      //   data: { result },
      // } = res;

      if (result === 'success') {
        console.log('성공시의 로직 다루기');
      } else {
        console.log('실패시의 로직 다루기');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        toggleFn(false);
      }, 5000);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const invalidationMessage = validateInput(email, pw, pwAgain);
    if (invalidationMessage) {
      console.log('----------validation실패----------');
      console.log(invalidationMessage); // TODOS 오류메세지 뿌리기
      console.log('---------------------------------');
      return;
    }

    try {
      // const res = axios.post('/login', {
      //   email,
      //   pw,
      //   pwCheck: pwAgain,
      //   nickname,
      // });

      // const { data: { result } } = res;
      const result = 'success';

      if (result === 'success') {
        toggle();
      } else {
        console.log('회원가입 관련 로직 작성'); // TODOS 오류메세지 뿌리기
      }
    } catch (error) {
      console.log('----------서버에러----------');
      console.log(error); // TODOS 오류메세지 뿌리기
      console.log('---------------------------------');
    } finally {
      console.log('isLoading관련작업 수정해보기');
    }
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
            error={!isEmailValid}
            type="email"
            value={email}
            margin="dense"
            size={isTabletView ? 'normal' : 'small'}
            onChange={(e) => onEmailChange(e.target.value)}
            fullWidth
            helperText={!isEmailValid && '유효하지 않은 이메일 형식입니다.'}
          />
          <LoadingButton
            onClick={() =>
              handleDuplicateCheck('email', email, setEmailLoading)
            }
            loading={emailLoading}
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
            error={!isPwEnoughLength}
            type="password"
            size={isTabletView ? 'normal' : 'small'}
            value={pw}
            onChange={(e) => onPwChange(e.target.value)}
            helperText={
              !isPwEnoughLength && '비밀번호는 6자 이상 20자 이하입니다.'
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
            error={!isPwAgainEnoughLength}
            margin="dense"
            size={isTabletView ? 'normal' : 'small'}
            fullWidth
            onChange={(e) => onPwAgainChange(e.target.value)}
            helperText={
              !isPwAgainEnoughLength && '비밀번호는 6자 이상 20자 이하입니다.'
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
            onChange={(e) => setNickname(e.target.value)}
            fullWidth
          />
          <LoadingButton
            loading={nicknameLoading}
            variant="outlined"
            onClick={() =>
              handleDuplicateCheck('nickname', nickname, setNicknameLoading)
            }
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
          <Button
            variant="contained"
            size="large"
            onClick={handleFormSubmit}
            disabled={
              !isAllTrue(
                email,
                isEmailValid,
                pw,
                isPwEnoughLength,
                pwAgain,
                isPwAgainEnoughLength,
                nickname,
              )
            }
          >
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
