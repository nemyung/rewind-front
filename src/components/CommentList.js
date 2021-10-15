/* eslint-disable consistent-return */
import React from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import Comment from './Comment';

const CommentList = () => {
  const commentIdList = useSelector((state) => {
    const comments = state.posts.current?.comments;
    const ids = comments.map((comment) => comment.id);
    return ids;
  }, isEqual);

  if (!commentIdList?.length) {
    return null;
  }

  return commentIdList.map((id) => <Comment key={id} id={id} />);
};

export default CommentList;
