import React from 'react';

const Post = (props) => {
  /* eslint-disable */
  const { title, contents, insertDt, nickname, commentCnt } = props;

  console.log(props);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <p>{title}</p>
        <p>{nickname}</p>
        <p>{insertDt}</p>
      </div>
      <div>
        <p>{contents}</p>
      </div>
      <div>
        <p>댓글 {commentCnt}개</p>
      </div>
    </>
  );
};

Post.defaultProps = {
  title: '님들 이거 맞춰 보세용',
  author: 'aaa@aaa.com',
  contents: '저희 조는 왜 4명 일까요?',
  insertDt: '2021-10-12',
  nickname: '우석쿤',
  commentCnt: 0,
};

export default Post;
