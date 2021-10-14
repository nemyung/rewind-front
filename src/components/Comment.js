import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// comment: "asd"
// id: 3
// insertDt: "2021-10-14T04:29:17.674184"
// modifiedDt: "2021-10-14T04:29:17.674184"
// nickname: "iamsemyung@gmail.com"

const Comment = ({ id }) => {
  const comment = useSelector(
    (state) => state.posts.current.comments.find((c) => c.id === id),
    isEqual,
  );

  const md = comment.insertDt.split('T')[0].split('-').slice(1).join('.');

  // const [isEditMode, setIsEditMode] = React.useState(false);
  console.log(comment);
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ width: '80%', margin: '0 auto' }}
    >
      <Paper elevation={0} sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: '12px' }}>{comment.nickname}</Typography>
      </Paper>
      <Paper
        elevation={0}
        sx={{ mb: 2, fontSize: '12px', flexGrow: '1', textAlign: 'center' }}
      >
        <Typography sx={{ fontSize: '12px' }}>{comment.comment}</Typography>
      </Paper>
      <Paper elevation={0} sx={{ mb: 2, fontSize: '12px' }}>
        <Typography sx={{ fontSize: '12px' }}>{md}</Typography>
      </Paper>
      <Paper elevation={0} sx={{ mb: 2, fontSize: '12px' }}>
        <Tooltip title="수정하기">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="삭제하기">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </Stack>
  );
};

Comment.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Comment;
