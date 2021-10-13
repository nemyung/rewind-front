import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { history } from '../features/configureStore';
import { updatePostToAxios } from '../features/posts/actions';

// /* eslint-disable */

const PostEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [updateTitle, setUpdateTitle] = React.useState('');
  const [updateContents, setUpdateContents] = React.useState('');

  const editPost = () => {
    // postid, contents
    dispatch(
      // 로컬 테스트
      updatePostToAxios(params.id, {
        title: updateTitle,
        contents: updateContents,
      }),

      // 명세 된 형식으로 보냄.
      // updatePostToAxios({
      //   id: params.id,
      //   title: updateTitle,
      //   contents: updateContents,
      // }),
    );
    console.log(params);
    console.log(updateTitle);
    console.log(updateContents);
  };

  const editTitle = (e) => {
    setUpdateTitle(e.target.value);
  };

  const editContents = (e) => {
    setUpdateContents(e.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="postTitle">
          제목
          <input id="postTitle" type="text" onChange={editTitle} />
        </label>
      </div>
      <div>
        <label htmlFor="postWrite">
          게시글 내용
          <textarea
            id="postDesc"
            placeholder="게시글 입력"
            type="text"
            onChange={editContents}
          />
        </label>
      </div>
      <div>
        <button type="button" onClick={editPost}>
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
