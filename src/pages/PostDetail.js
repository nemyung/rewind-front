import React from 'react';
import isEqaul from 'lodash/isEqual';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { history } from '../features/configureStore';

import { deletePostToAxios } from '../features/posts/actions';

// import PropTypes from 'prop-types';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

// import PostEdit from './PostEdit';

/* eslint-disable */

const PostDetail = (props) => {
  const { userEmail, email } = props;
  const dispatch = useDispatch()
  const params = useParams();
  const postList = useSelector((state) => state.posts.byId, isEqaul);
  const isPost = postList[params.id];
  // 서버 연결 시 주석 제거
  // const toDay = isPost?.insertDt.split('T')[0];
  // const userInfo = useSelector((state) => state.user.email);

  // const isMe = userInfo === isPost.email;
  const isMe = userEmail === email;

  const moveToPostEdit = () => {
    history.push(`/edit/${props.match.params.id}`)
  }

  const deletePost = () => {
    dispatch(deletePostToAxios(params.id))
    history.push(`/edit/${props.match.params.id}`)
  }

  console.log(isMe);

  console.log(isPost);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <p>{isPost?.title}</p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p>{isPost?.nickname}</p>
        <p>{isPost?.insrtDt}</p>
        {isMe && <button type="button" onClick = {moveToPostEdit}>수정</button>}
        {isMe && <button type="button" onClick = {deletePost}>삭제</button>}
      </div>
      <div>
        <p>{isPost?.contents}</p>
      </div>
      <div>
        <p>댓글 {isPost?.commentCnt}개</p>
      </div>
      <div>
        <CommentForm />
        <CommentList />
      </div>
    </>
  );
};

PostDetail.defaultProps = {
  email: 'aaa@aaa.com',
  userEmail: 'aaa@aaa.com',
};

export default PostDetail;
