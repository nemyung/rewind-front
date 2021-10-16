import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Permit = ({ children }) => {
  const LoginEmail = useSelector((state) => state.user.email);

  if (LoginEmail) {
    return <>{children}</>;
  }
  return <Redirect to="/sign" />;
};

Permit.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Permit;
