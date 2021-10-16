import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Grid } from '../elements';
import MarkDownEditor from '../components/MarkDownEditor';

const PostWrite = () => {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('React');

  const handleRadioChange = (event) => {
    setCategory(event.target.value);
  };

  const isWeb = window.matchMedia('(min-width: 900px)').matches;

  return (
    <Grid padding={isWeb ? '60px 20px 20px 20px' : '0'} margin="0">
      <Grid width={isWeb ? '80%' : '100%'} margin="auto" height="80%">
        <Card sx={{ height: '100%' }}>
          <Grid padding={isWeb ? '0px 35px' : '0'}>
            <Grid is_flex>
              <CardHeader title="게시글 작성" />
            </Grid>
          </Grid>
          <hr style={{ width: isWeb ? '90%' : '100%', margin: 'auto' }} />
          <Grid padding={isWeb ? '0px 30px' : '0'}>
            <CardContent>
              <Grid
                width={isWeb ? 'auto' : '100%'}
                margin={isWeb ? '20px auto' : '4px 0'}
              >
                <TextField
                  value={title}
                  sx={{ width: '100%', height: 'auto' }}
                  label="게시글 제목"
                  id="postTitle"
                  size={isWeb ? 'normal' : 'small'}
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <Grid margin={isWeb ? '20px auto' : '12px auto'}>
                  <label
                    style={{ margin: isWeb ? '0px 10px' : '0px 4px' }}
                    htmlFor="category"
                  >
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
                  <label
                    style={{ margin: isWeb ? '0px 10px' : '0px 6px' }}
                    htmlFor="category"
                  >
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
                  <label
                    style={{ margin: isWeb ? '0px 10px' : '0px 6px' }}
                    htmlFor="category"
                  >
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
              <Grid margin={isWeb ? '50px auto' : '0'}>
                <MarkDownEditor category={category} title={title} />
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostWrite;
