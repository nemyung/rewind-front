/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import Comment from './Comment';

// will use prop ids?
const MOCK_UP = [
  {
    id: 1,
    postId: 12,
    email: 'jackiebird@quilm.com',
    comment: 'Proident laborum quis cupidatat amet id veniam ad.',
    nickname: 'incididunt',
    insertDt: '2017-05-28T08:22:08 -09:00',
  },
  {
    id: 2,
    postId: 11,
    email: 'nielsendrake@yogasm.com',
    comment: 'Qui do est non amet irure do quis.',
    nickname: 'Lorem',
    insertDt: '2017-06-21T07:31:43 -09:00',
  },
  {
    id: 3,
    postId: 14,
    email: 'chaneybeck@netplax.com',
    comment: 'Sint et ex ad ut Lorem sunt pariatur.',
    nickname: 'deserunt',
    insertDt: '2020-01-11T01:30:17 -09:00',
  },
];

// TODOS: SORT COMMENT LIST
// TODOS: OPTIMIZATION
const CommentList = ({ id }) => {
  const comments = useSelector(
    (state) => state.posts.byId[id]?.comments,
    isEqual,
  );

  // if (!comments?.length) {
  //   return null;
  // }

  // id인지 commentId인지 체크해야 할 필요성 생김
  // return comments.map((comment) => (
  //   <Comment key={comment.id} id={comment.id} />
  // ));

  return MOCK_UP.slice().map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));
};

CommentList.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CommentList;
