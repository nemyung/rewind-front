import React from 'react';
import { useSelector } from 'react-redux';

/* eslint-disable */

const Post = (props) => {
  // const toDay = isPost?.insertDt.split('T')[0];
  const userInfo = useSelector((state) => state.user.email);

  const isMe = userInfo === isPost.email;

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
        <p>{isPost?.insertDt}</p>
        {isMe && <button type="button">수정</button>}
      </div>
      <div>
        <p>{isPost?.contents}</p>
      </div>
      <div>
        <p>댓글 {isPost?.commentCnt}개</p>
      </div>
    </>
  );
};

export default Post;
