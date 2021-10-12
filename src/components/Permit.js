import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

// /* eslint-disable */
const Permit = ({ children }) => {
  const LoginEmail = useSelector((state) => state.user.email);

  if (LoginEmail) {
    return <>{children}</>;
  }
  return null;
};

Permit.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Permit;
