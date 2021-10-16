import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import GitHubIcon from '@mui/icons-material/GitHub';

import { ReactComponent as ReactIcon } from '../assets/react.svg';
import { ReactComponent as SpringIcon } from '../assets/spring.svg';

const NotFound = () => {
  const history = useHistory();
  const isAboveTablet = window.matchMedia('(min-width: 768px)').matches;
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '768px',
        margin: '0 auto',
        marginTop: isAboveTablet ? '24px' : '0px',
      }}
      elevation={1}
    >
      <div>
        <Stack
          direction="column"
          alignItems="center"
          sx={{
            fontSize: '14px',
            width: '80%',
            lineHeight: '150%',
            margin: '16px auto',
          }}
        >
          <h3>알 수 없는 경로에 접속하셨습니다.</h3>
          <h4 style={{ margin: '8px 0' }}>그리고, 방문해주셔서 감사합니다.</h4>
          <p>
            본래 에러 처리 용도로 페이지를 간단하게 구현하려고 하였으나,
            프로젝트를 통하여 느꼈던 감정을 적는 공간으로 구상하였습니다. 짧은
            시간동안 주특기 공부를 마치고 바로 프로젝트에 투입하였기 때문에 아직
            부족한점이 많습니다. 그럼에도 서로 배려하는 마음을 가지고 진행하였기
            때문에 모두가 후회없는 결과물을 낼 수 있었습니다. 항해99의 모토는
            99일간 함께 몰두하고 매진하며 하나의 목표를 향해 고군분투하는
            것입니다. 그 모토를 가지고 의미있는 6일을 보내게 되어 기쁩니다. 다시
            한 번 저희의 프로젝트에 방문해주셔서 감사드립니다.
          </p>
          <Button
            sx={{ margin: '16px 0' }}
            variant="contained"
            onClick={() => history.replace('/')}
          >
            메인 페이지로 이동
          </Button>
        </Stack>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="project-summary"
            aria-controls="project-summary-panel"
          >
            프로젝트 후기
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                  <SpringIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Stack direction="row" alignItems="center">
                      <Name>오준석(팀장)</Name>
                      <StyledLInk
                        href="https://github.com/junseok93"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon sx={{ width: '16px', height: '16px' }} />
                      </StyledLInk>
                    </Stack>
                  }
                  secondary={
                    <StyledP>
                      처음으로 프론트와 백이 나뉘어져서 진행되는 프로젝트였는데
                      총 4분중 같이 하시는분들이 다들 너무 성격도 좋으시고
                      실력도 너무 출중하셔서 부족한 제가 정말 많은것을 얻어 가는
                      시간이었습니다. 세명님한테는 꼼꼼함과
                      디테일함을,선강님께는 스프링에서의 노하우를 우석님께는
                      끝까지 본인의 일을 마치는 책임감을 배운시간이었습니다.
                    </StyledP>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                  <SpringIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Stack direction="row" alignItems="center">
                      <Name>최선강</Name>
                      <StyledLInk
                        href="https://github.com/zzangoobrother"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon sx={{ width: '16px', height: '16px' }} />
                      </StyledLInk>
                    </Stack>
                  }
                  secondary={
                    <StyledP>
                      처음으로 백엔드와 프론트엔드로 나눠 작업을 했고 또
                      프론트엔드 서버와 백엔드 서버를 나눠 운영하는데 있어 평소
                      공부하면서 해오던 과정들이 단순히 백엔드 만을 고려한
                      것이었다는 생각을 하게되었습니다. 이제는 단편적인 생각이나
                      판단보다는 넓게 생각해서 개발을 했야겠다고 깨닫는
                      시간이었습니다.
                    </StyledP>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                  <ReactIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Stack direction="row" alignItems="center">
                      <Name>한우석</Name>
                      <StyledLInk
                        href="https://github.com/hdsshj"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon sx={{ width: '16px', height: '16px' }} />
                      </StyledLInk>
                    </Stack>
                  }
                  secondary={
                    <StyledP>
                      이번에 프로젝트를 하면서 정말 많은 것을 느끼고 배웠습니다.
                      혼자 일 하는게 아니기 때문에 기능만 잘 작동하는 코드가
                      아닌 유지보수를 고려한 코드를 짜야한다는 것을 알게 되었고,
                      디자인의 화려함에 우선 순위를 두지 말고 항상 퍼포먼스를
                      늘리기 위한 고민을 더 해야겠다고 생각했습니다.
                    </StyledP>
                  }
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{ width: '24px', height: '24px' }}>
                  <ReactIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Stack direction="row" alignItems="center">
                      <Name>오세명</Name>
                      <StyledLInk
                        href="https://github.com/nemyung"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon sx={{ width: '16px', height: '16px' }} />
                      </StyledLInk>
                    </Stack>
                  }
                  secondary={
                    <StyledP>
                      각자의 시간 속에서 주특기 공부를 마치고 처음으로 대면하여
                      만났습니다. 서로가 공부한 언어가 달라도 서로 통하는
                      관심사가 있었기 때문에 소통에 어려움이 없었습니다.
                      무엇보다 서로 배려하는 하는 모습을 보고 협업을 할 때 가장
                      필요한 덕목이 무엇인지 생각해보게 되었습니다.함께 같이
                      고생한 팀원분들께 감사드립니다.
                    </StyledP>
                  }
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
    </Card>
  );
};

const Name = styled.span`
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
`;

const StyledLInk = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;
`;

const StyledP = styled.p`
  line-height: 150%;
  margin-top: 10px;
`;

export default NotFound;
