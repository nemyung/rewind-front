import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LoadingIcon } from '../assets/pulse.svg';

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingIcon />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
