/* eslint-disable no-unused-vars */
import axios from 'axios';
import { LOGIN } from './types';
import { saveToken } from '../../utils/auth';

const login = (payload) => ({
  type: LOGIN,
  payload,
});

const miniMockup = [
  {
    id: 0,
    email: 'iamsemyung@gmail.com',
    pw: '12341234',
  },
];

export const loginToServer = (email, pw) => {
  return async (dispatch) => {
    try {
      //* 서버 있을 때 사용. 체크 필요.
      // const res = await axios.post('/login', { email, pw });
      // const { data } = res;
      // saveToken(data.token);
      // dispatch(login({ email: data.email, nickname: data.nickname }));

      const nickname = '오네명';
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          if (!miniMockup.some((user) => user.email === email)) {
            throw new Error('등록된 이메일을 찾을 수 없습니다');
          }

          const userData = miniMockup.find(
            (user) => user.email === 'iamsemyung@gmail.com',
          );

          if (userData.pw !== pw) {
            throw new Error('비밀번호가 일치하지 않습니다');
          }

          resolve({ token: 'hello world', email, nickname });
        }, 1500);
      });

      saveToken(data.token);
      dispatch(login({ email: data.email, nickname: data.nickname }));
    } catch (error) {
      console.error('비밀번호 불일치, 입력 이메일 저장 없음...');
      console.log('백에 물어보고 설정해야함. 타입별로 나눠서 내려야함..');
      throw new Error(error.message);
    }
  };
};

export const checkAuthToServer = (token) => async (dispatch) => {};
