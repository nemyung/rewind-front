import React from 'react';
import { useDispatch } from 'react-redux';
import { history } from '../features/configureStore';
import { updatePostToAxios } from '../features/posts/actions';

/* eslint-disable */

const PostEdit = (props) => {
  const [title, setTitle] = React.useState('');
  const [contents, setContents] = React.useState('');

  const dispatch = useDispatch();



  const createPost = () => {
    console.log(contents);
    dispatch(updatePostToAxios({ id: '', title, contents }));
  };

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
          <textarea
            id="postDesc"
            placeholder="게시글 입력"
            type="text"
            onChange={setContents}
          />
        </label>
      </div>
      <div>
        <button type="button" onClick={createPost}>
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

export default PostEdit;
