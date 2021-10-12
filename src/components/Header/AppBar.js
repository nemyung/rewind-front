import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SwipeableDrawer } from '@mui/material';

const MobileBar = () => {
  const history = useHistory();
  const [isToggleOpen, setIsToggleOpen] = React.useState(false);
  const category = ['React', 'Node', 'Spring'];

  const toggle = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsToggleOpen(open);
  };

  const handleButtonClick = (language) => {
    // 필터링해서 보여주는 axios 만들어야 한다.
    console.log(language);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggle(false)}
      onKeyDown={toggle(false)}
    >
      <List>
        {category.map((language) => (
          <ListItem
            button
            key={language}
            onClick={() => handleButtonClick(language)}
          >
            <ListItemText primary={language} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggle(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            모두보기
          </Typography>
          <Button color="inherit" onClick={() => history.push('/sign')}>
            Login
          </Button>
        </Toolbar>
        <SwipeableDrawer
          open={isToggleOpen}
          onClose={toggle(false)}
          onOpen={toggle(true)}
        >
          {list()}
        </SwipeableDrawer>
      </AppBar>
    </Box>
  );
};

export default MobileBar;
