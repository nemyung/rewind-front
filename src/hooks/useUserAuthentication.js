import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../utils/auth';

export default function useUserAuthentication() {
  const isUserAuthorized = useSelector((state) => state.user.isAuthorized);
  const dispatch = useDispatch();
  const token = getToken();

  // 토큰이 없으면 무조건 얼리 리턴
  // 토큰이 있으면 디스패치해서 인가정보 보냄
  // isUserAuthorized가 true면 얼리 리턴 시키면 됨.
  React.useEffect(() => {
    if (!token || isUserAuthorized) {
      return null;
    }
  }, []);
}
