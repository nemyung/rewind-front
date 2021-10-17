import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { useUserAuthentication } from '../hooks';

const Permit = ({ children }) => {
  const [isUserAuthorized, token] = useUserAuthentication();

  if (token && !isUserAuthorized) {
    return <Loading />;
  }

  if (!(token || isUserAuthorized)) {
    return <Redirect to="/sign" />;
  }

  return children;
};

Permit.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Permit;
