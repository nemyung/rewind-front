import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import {
  modifyCommentToAxios,
  removeCommentToAxios,
} from '../features/posts/actions';

const Comment = ({ id }) => {
  const comment = useSelector(
    (state) => state.posts.current.comments.find((c) => c.id === id),
    isEqual,
  );
  const dispatch = useDispatch();
  const currentUserNickname = useSelector((state) => state.user.nickname);
  const [modifiedComment, setModifiedComment] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleModifyButtonClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const buttonId = open ? 'modify-card' : undefined;
  const isCurrentUserComment = currentUserNickname === comment.nickname;

  const md = comment.insertDt.split('T')[0];

  const handleModifyInputButtonClick = () => {
    dispatch(modifyCommentToAxios(comment.id, modifiedComment));
  };
  const handleDeleteButtonClick = () => {
    dispatch(removeCommentToAxios(comment.id));
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ width: '80%', margin: '0 auto', my: 3 }}
    >
      <div style={{ width: '100%' }}>
        <Stack direction="row" alignItems="end">
          <Typography sx={{ fontSize: '16px', mr: 1 }}>
            <b>{comment.nickname}</b>
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#BDBDBD' }}>
            {md}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2, fontSize: '12px', my: 1, width: '100%' }}
        >
          <Typography sx={{ fontSize: '12px' }}>{comment.comment}</Typography>
          {isCurrentUserComment && (
            <div>
              <IconButton
                aria-describedby={buttonId}
                onClick={handleModifyButtonClick}
                sx={{ p: 0, mx: 1 }}
              >
                <EditIcon sx={{ fontSize: '18px' }} />
              </IconButton>
              <Popover
                id={buttonId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Paper
                  variant={8}
                  sx={{
                    width: '100%',
                    height: '20%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Modifier
                    type="text"
                    value={modifiedComment}
                    onChange={(e) => setModifiedComment(e.target.value)}
                  />
                  <Button onClick={handleModifyInputButtonClick}>수정</Button>
                </Paper>
              </Popover>
              <Tooltip title="삭제하기">
                <IconButton sx={{ p: 0 }} onClick={handleDeleteButtonClick}>
                  <DeleteIcon sx={{ fontSize: '18px' }} />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </Stack>
      </div>
    </Stack>
  );
};

Comment.propTypes = {
  id: PropTypes.number.isRequired,
};

const Modifier = styled.input`
  width: 200px;
  border: none;
  padding: 0 8px;
  font-size: 12px;

  &:focus {
    outline: none;
  }
`;
export default Comment;
