import React from 'react';
import { useSelector } from 'react-redux';

import AppBar from './AppBar';

const Header = () => {
  const isUserLogin = useSelector((state) => Boolean(state.user.email));
  console.log(isUserLogin);

  return <AppBar status={isUserLogin} />;
};

export default Header;
