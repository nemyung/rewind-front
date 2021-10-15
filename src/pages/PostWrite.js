import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/* eslint-disable */
import MarkDownEditor from '../components/MarkDownEditor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import { Grid } from '../elements';

import { createPostToAxios } from '../features/posts/actions';

const PostWrite = () => {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('React');
  const [contents, setContents] = React.useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    setCategory(event.target.value);
  };

  const editorRef = React.useRef(null);
  
  const options = {
    previewStyle: 'vertical',
    initialEditType: 'markdown',
    height: '600px',
    useCommandShortcut: true,
    previewHighlight: false,
    ref: editorRef,
    plugins: [colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]],
    initialValue: contents,
    events: {
      change() {
        setContents(editorRef.current.getInstance().getMarkdown());
      }
    }
  };

  const handleSubmitButtonClick = () => {
    if (!title) {
      window.alert('게시물 제목을 입력해주세요.');
      return;
    }

    if (!contents) {
      window.alert('게시물 내용을 입력해주세요.');
      return;
    }

    dispatch(createPostToAxios({ category, title, contents }));
    history.replace('/');
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
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
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
                <button onClick={() => {
                  const current = editorRef.current;
                  console.log(current);
                }}>test</button>
              </Grid>
              <Editor {...options}/>
              <Grid>
                <Button
                  sx={{ float: 'right', margin: '10px' }}
                  variant="contained"
                  type="button"
                  onClick={handleSubmitButtonClick}
                >
                  작성완료
                </Button>
                <Button
                  sx={{ float: 'right', margin: '10px' }}
                  variant="outlined"
                  type="button"
                  onClick={() => history.goBack()}
                >
                  돌아가기
                </Button>
              </Grid>
              <Grid margin="50px auto">
                {/* <MarkDownEditor category={category} title={title} /> */}
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostWrite;
