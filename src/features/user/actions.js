/* eslint-disable no-unused-vars */
import axios from 'axios';
import { LOGIN } from './types';

const baseURL = process.env.REACT_APP_REMOTE_SERVER_URI;

const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const loginToServer = (email, pw) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/login`, { email, pw });
    const { data } = res;

    if (data.result === 'fail') {
      return data;
    }

    dispatch(login({ email: data.email, nickname: data.nickname }));

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkAuthToServer = (token) => async (dispatch) => {};
