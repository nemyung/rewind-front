import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const WebBar = () => {
  const history = useHistory();
  return (
    <Paper
      elevation={1}
      square
      component="header"
      sx={{
        height: '80px',
        position: 'sticky',
        top: '0',
        width: '100%',
        px: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h4">
        REWIND
      </Typography>
      <Button color="inherit" onClick={() => history.push('/sign')}>
        Login
      </Button>
    </Paper>
  );
};

export default WebBar;
