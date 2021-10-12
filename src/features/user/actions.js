/* eslint-disable no-unused-vars */
import axios from 'axios';
import { LOGIN } from './types';

const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const checkAuthToServer = (token) => async (dispatch) => {};
