/* eslint-disable no-unused-vars */
import axios from 'axios';
import { LOGIN } from './types';
import { saveToken } from '../../utils/auth';

const baseURL = process.env.REACT_APP_REMOTE_SERVER_URI;

const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const loginToServer = (email, pw) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/login`, { email, pw });
    const { data } = res;
    console.log(data);
    if (data.result === 'fail') {
      console.log(data.errorMessage);
      return data.message;
    }

    saveToken(data.token);
    return dispatch(login({ email: data.email, nickname: data.nickname }));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkAuthToServer = (token) => async (dispatch) => {};
