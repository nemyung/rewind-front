import React from 'react';
import isEqaul from 'lodash/isEqual';
import { useSelector } from 'react-redux';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

/* eslint-disable */

const Post = (props) => {
  const postList = useSelector((state) => state.posts.byId, isEqaul);
  const isPost = postList[props.match.params.id]
  const toDay = isPost.insertDt.split('T')[0];


  console.log(isPost);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <p>{isPost.title}</p>
      </div>
      <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <p>{isPost.nickname}</p>
        <p>{toDay}</p>
      </div>
      <div>
        <p>{isPost.contents}</p>
      </div>
      <div>
        <p>댓글 {isPost.commentCnt}개</p>
        <CommentForm />
        <CommentList />
      </div>
    </>
  );
};



export default Post;
