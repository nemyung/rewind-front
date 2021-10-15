/* eslint-disable no-unused-vars */
import axios from 'axios';
import { LOGIN, LOG_OUT, AUTHORIZED } from './types';
// import { removeToken } from '../../utils/auth';

const baseURL = process.env.REACT_APP_REMOTE_SERVER_URI;

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

const logOut = () => ({ type: LOG_OUT });

const authorize = (email, nickname) => ({
  type: AUTHORIZED,
  payload: { email, nickname },
});

const loginToServer = (email, pw) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/login`, { email, pw });
    const { data } = res;

    if (data.result === 'fail') {
      return data;
    }

    dispatch(login({ email: data.email, nickname: data.nickname }));

    return data;
  } catch (error) {
    console.log('error');
    console.log(error);
    console.log('error');
    throw new Error(error.message);
  }
};

export { logOut, loginToServer, authorize };
