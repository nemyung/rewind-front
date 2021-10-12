import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Login from '../components/Login';
import Signup from '../components/Signup';

import bgSrc from '../assets/bg.jpg';

const Sign = () => {
  const [isLoginMode, setIsLoginMode] = React.useState(true);
  const toggleMode = () => setIsLoginMode((prev) => !prev);
  const isWebView = window.matchMedia('(min-width: 1200px)').matches;
  return (
    <Box
      sx={{
        height: '100%',
        backgroundImage: `url(${bgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: isWebView ? 'row' : 'column',
        justifyContent: isWebView ? 'space-between' : 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: `${isWebView ? '50%' : 'auto'}`,
          margin: '0 auto',
          textAlign: `${isWebView ? 'end' : 'center'}`,
        }}
      >
        <Typography variant="h3" gutterBottom>
          REWIND, REMIND
        </Typography>
        <Typography variant="subtitle" gutterBottom>
          잠시 돌아보는 나의 항해 여정
        </Typography>
      </Box>
      <Box
        component="div"
        sx={{
          maxWidth: '414px',
          width: '100%',
          height: 'auto',
          margin: `${isWebView ? '1rem auto' : '1rem'}`,
        }}
      >
        {isLoginMode ? (
          <Login toggle={toggleMode} />
        ) : (
          <Signup toggle={toggleMode} />
        )}
      </Box>
    </Box>
  );
};

export default Sign;
