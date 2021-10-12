import React from 'react';
import { history } from '../features/configureStore';

const PostWrite = () => {
  return (
    <>
      <div>
        <label htmlFor="postTitle">
          제목
          <input id="postTitle" type="text" />
        </label>
      </div>
      <div>
        <label htmlFor="postWrite">
          게시글 내용
          <textarea id="postDesc" placeholder="게시글 입력" type="text" />
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            history.push('/');
          }}
        >
          작성완료
        </button>
        <button
          type="button"
          onClick={() => {
            history.push('/');
          }}
        >
          돌아가기
        </button>
      </div>
    </>
  );
};

PostWrite.defaultProps = {
  title: '님들 이거 맞춰보세용',
  contents: '우리 조는 왜 4명밖에 없게요?',
};

export default PostWrite;
