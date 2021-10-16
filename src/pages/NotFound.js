import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <StyledWrapper>
      <p>
        저희 프로젝트를 봐주셔서 감사합니다. 지금 보고 계신 페이지는 올바르지
        않은 경로로 접근했을 때 나타납니다. 아래의 버튼을 눌러 메인페이지로
        이동해주세요.
      </p>
      <h3>프로젝트 참여자: </h3>
      <p>프론트엔드: 한우석 오세명</p>
      <p>백엔드: 오준석 최선강</p>
      <Button onClick={() => history.replace('/')}>메인 페이지로 이동</Button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: yellow;
`;

export default NotFound;
