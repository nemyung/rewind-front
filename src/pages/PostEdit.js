import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import MarkDownEditor from '../components/MarkDownEditor';

// import IconButton from '@mui/material/IconButton';
// import { updatePostToAxios } from '../features/posts/actions';
// import { history } from '../features/configureStore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '../elements';

/* eslint-disable */

const PostEdit = () => {
  const params = useParams();
  // const dispatch = useDispatch();
  const [updateTitle, setUpdateTitle] = React.useState('');
  // const [updateContents, setUpdateContents] = React.useState('');
  const [category, setCategory] = React.useState('React');

  const currentPost = useSelector(state => state.posts.byId[params.id])

  console.log(currentPost)
  const handleRadioChange = (event) => {
    setCategory(event.target.value);
  };

  // const editPost = () => {
  //   // postid, contents
  //   dispatch(
  //     // 로컬 테스트
  //     // updatePostToAxios(params.id, {
  //     //   title: updateTitle,
  //     //   contents: updateContents,
  //     // }),

  //     // 명세 된 형식으로 보냄.
  //     updatePostToAxios({
  //       id: params.id,
  //       title: updateTitle,
  //       contents: updateContents,
  //     }),
  //   );
  //   console.log(params);
  //   console.log(updateTitle);
  //   console.log(updateContents);
  // };

  const editTitle = (e) => {
    setUpdateTitle(e.target.value);
  };

  // const editContents = (e) => {
  //   setUpdateContents(e.target.value);
  // };

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
                  defaultValue={currentPost.title}
                  type="text"
                  variant="outlined"
                  onChange={editTitle}
                />
                <Grid margin="20px auto">
                  <label style={{ margin: '0px 10px' }} htmlFor="category">
                    <input
                      id="React"
                      name="React"
                      value="React"
                      type="radio"
                      checked={category === 'React'}
                      onChange={handleRadioChange}
                    />
                    &nbsp;React
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
                    &nbsp;NodeJS
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
                    &nbsp;Spring
                  </label>
                </Grid>
              </Grid>
              <Grid margin="50px auto">
                <MarkDownEditor category={category} title={updateTitle} currentContent = {currentPost.Content}  />
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostEdit;
