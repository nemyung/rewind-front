// /* eslint-disable no-alert */
import React from 'react';
// import { useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import T from '../api/tokenInstance';
import { history } from '../features/configureStore';
import { Grid } from '../elements';
// import { createPost } from '../features/posts/actions';

const PostWrite = () => {
  // const toastRef = React.useRef(null);

  // const dispatch = useDispatch();
  const [title, setTitle] = React.useState('');
  const [contents, setContents] = React.useState({ contents: '' });
  const [category, setCategory] = React.useState('React');

  // const get = () => {
  //   const getMarkDown = toastRef.current.getInstance().getMarkdown();
  //   console.log(getMarkDown);
  //   setContents(getMarkDown);
  // };

  const addPost = async () => {
    const { data } = await T.POST('/post', {
      title,
      contents,
      category,
    });
    console.log(data);

    console.log(data);

    // dispatch(createPost(data.data));

    // if (data.result === 'fail') {
    //   alert('오류 발생!');
    // } else {
    //   history.replace('/');
    // }
  };

  const handleRadioChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Grid>
      <Grid
        width="80%"
        padding="60px 20px 20px 20px"
        margin="auto"
        height="80%"
      >
        <Card sx={{ height: '100%' }}>
          <Grid padding="0px 30px">
            <Grid is_flex>
              <CardHeader title="게시글 작성" />
            </Grid>
          </Grid>
          <hr style={{ width: '90%', margin: 'auto' }} />
          <Grid padding="0px 30px">
            <CardContent>
              <Grid width="auto" margin="20px auto">
                <TextField
                  sx={{ width: '100%' }}
                  label="게시글 제목"
                  id="postTitle"
                  value={title}
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <Grid margin="20px auto">
                  <label style={{ margin: '0px 10px' }} htmlFor="category">
                    <input
                      id="react"
                      name="react"
                      value="react"
                      type="radio"
                      checked={category === 'react'}
                      onChange={handleRadioChange}
                    />
                    React
                  </label>
                  <label style={{ margin: '0px 10px' }} htmlFor="category">
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
                  <label style={{ margin: '0px 10px' }} htmlFor="category">
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
                </Grid>
              </Grid>
              <Grid margin="50px auto">
                <textarea
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                />
              </Grid>
              <Grid>
                <button type="button" onClick={addPost}>
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
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

PostWrite.defaultProps = {
  title: '님들 이거 맞춰보세용',
  contents: '우리 조는 왜 4명밖에 없게요?',
};

export default PostWrite;
