import React from 'react';
import { useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import MarkDownEditor from '../components/MarkDownEditor';

import { Grid } from '../elements';

const PostEdit = () => {
  const currentPost = useSelector((state) => state.posts.current);
  const [updateTitle, setUpdateTitle] = React.useState(currentPost.title);
  const [category, setCategory] = React.useState('React');

  const handleRadioChange = (event) => {
    setCategory(event.target.value);
  };

  const editTitle = (e) => {
    setUpdateTitle(e.target.value);
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
                <MarkDownEditor
                  category={category}
                  updateTitle={updateTitle}
                  currentPost={currentPost}
                />
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostEdit;
