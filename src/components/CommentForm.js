import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';

import { addCommentToAxios } from '../features/posts/actions';

const CommentForm = ({ id }) => {
  const [comment, setComment] = React.useState('');
  const dispatch = useDispatch();

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    dispatch(addCommentToAxios(id, comment));
    setComment('');
  };

  const isWeb = window.matchMedia('(min-width: 768px)').matches;
  return (
    <CommentInputWrapper isWeb={isWeb}>
      <CreateIcon />
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        type="button"
        onClick={handleCommentSubmit}
        disabled={!comment}
        sx={{ width: '10%' }}
      >
        등록
      </Button>
    </CommentInputWrapper>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string.isRequired,
};

const CommentInputWrapper = styled.div`
  width: ${({ isWeb }) => (isWeb ? '80%' : '100%')};
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 8px 12px;
  margin: 0 auto;
  margin-bottom: 14px;

  & input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 12px;

    &:focus {
      outline: none;
    }
  }
`;

export default CommentForm;
