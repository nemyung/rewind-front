import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, removeToken } from '../utils/auth';
import { authorize } from '../features/user/actions';
import T from '../api/tokenInstance';

// 토큰이 없으면 무조건 얼리 리턴
// 토큰이 있으면 디스패치해서 인가정보 보냄
// isUserAuthorized가 true면 얼리 리턴 시키면 됨.

//* CASE1
//* 유저가 토큰을 가지고 있지도 않음 => 얼리리턴

//* CASE2
//* 유저가 토큰을 가지고 있고, 토큰이 만료되지 않은 상황에서 새로고침을 눌렀을 때

//* CASE3
//* 유저가 토큰을 가지고 있고, 토큰이 만료된 상황에서 새로고침을 눌렀을 때

const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

export default function useUserAuthentication() {
  const isUserAuthorized = useSelector((state) => state.user.isAuthorized);

  const dispatch = useDispatch();
  const token = getToken();

  React.useEffect(() => {
    if (!token || isUserAuthorized) {
      return null;
    }

    async function test() {
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

    test();

    return () => null;
  }, []);
}
