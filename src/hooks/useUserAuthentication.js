/* eslint-disable consistent-return */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, removeToken } from '../utils/auth';
import { authorize } from '../features/user/actions';
import T from '../api/tokenInstance';

const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

export default function useUserAuthentication() {
  const isUserAuthorized = useSelector((state) => state.user.isAuthorized);

  const dispatch = useDispatch();
  const token = getToken();

  React.useEffect(() => {
    if (!token || isUserAuthorized) {
      return null;
    }

    async function authorizeToServer() {
      try {
        const { data } = await T.GET('/auth');
        if (data.result === 'fail') {
          removeToken(TOKEN_KEY);
          return null;
        }

        const { nickname, email } = data;

        dispatch(authorize(email, nickname));
      } catch (error) {
        console.error(error);
        console.error(error.message);
      }
      return null;
    }

    authorizeToServer();
  }, []);
}
