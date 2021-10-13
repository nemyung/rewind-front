/* eslint-disable no-alert */
import React from 'react';
// import { useDispatch } from 'react-redux';
import { history } from '../features/configureStore';
// import { createPostToAxios } from '../features/posts/actions';
import T from '../api/tokenInstance';

const PostWrite = () => {
  // const dispatch = useDispatch();

  const [title, setTitle] = React.useState('');
  const [contents, setContents] = React.useState('');
  const [category, setCategory] = React.useState('React');

  const createPost = async () => {
    const { data = {} } = await T.POST('/posts/new', {
      title,
      contents,
      category,
    });

    if (data.result === 'fail') {
      alert('오류 발생!');
    } else {
      history.replace('/');
    }
  };
  console.log(category);
  const handleRadioChange = (event) => setCategory(event.target.value);

  return (
    <>
      <div>
        <label htmlFor="postTitle">
          제목
          <input
            id="postTitle"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <div>
          <label htmlFor="category">
            <input
              id="React"
              name="React"
              value="React"
              type="radio"
              checked={category === 'React'}
              onChange={handleRadioChange}
            />
            React
          </label>
          <label htmlFor="category">
            <input
              id="NodeJS"
              name="NodeJS"
              value="NodeJS"
              type="radio"
              checked={category === 'NodeJS'}
              onChange={handleRadioChange}
            />
            NodeJS
          </label>
          <label htmlFor="category">
            <input
              id="Spring"
              name="Spring"
              value="Spring"
              type="radio"
              checked={category === 'Spring'}
              onChange={handleRadioChange}
            />
            Spring
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="postWrite">
          게시글 내용
          <textarea
            id="postDesc"
            placeholder="게시글 입력"
            type="text"
            onChange={(e) => {
              setContents(e.target.value);
            }}
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

PostWrite.defaultProps = {
  title: '님들 이거 맞춰보세용',
  contents: '우리 조는 왜 4명밖에 없게요?',
};

export default PostWrite;
