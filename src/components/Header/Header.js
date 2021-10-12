import React from 'react';
import WebBar from './WebBar';
import AppBar from './AppBar';

const Header = () => {
  const isTabletView = window.matchMedia('(min-width: 768px)').matches;
  return isTabletView ? <WebBar /> : <AppBar />;
};

export default Header;
