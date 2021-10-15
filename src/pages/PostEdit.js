/* eslint-disable */
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import MarkDownEditor from '../components/MarkDownEditor';

// import IconButton from '@mui/material/IconButton';
// import { updatePostToAxios } from '../features/posts/actions';
// import { history } from '../features/configureStore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

import { Grid } from '../elements';

import { updatePostToAxios } from '../features/posts/actions';

const PostEdit = () => {
  const { id: postId } = useParams();
  const currentPost = useSelector((state) => state.posts.current);
  const [updatedTitle, setUpdatedTitle] = React.useState(currentPost.title);
  const [updatedContents, setUpdatedContents] = React.useState(currentPost.contents);
  // const currentPost = useSelector((state) => state.posts.byId[params.id]);
  // const [updateTitle, setUpdateTitle] = React.useState(currentPost.title);
  const [category, setCategory] = React.useState('React');
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(postId);

  const handleRadioChange = (event) => {
    setCategory(event.target.value);
  };

  const editTitle = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const editorRef = React.useRef(null);

  const options = {
    previewStyle: 'vertical',
    initialEditType: 'markdown',
    height: '600px',
    useCommandShortcut: true,
    previewHighlight: false,
    ref: editorRef,
    // colorSyntax: 글자 색 바꾸는 기능 / condeSyntaxHighlight : 언어에 따른 코드 색 변경
    plugins: [colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]],
    initialValue: updatedContents,
    events: {
      change() {
        setUpdatedContents(editorRef.current.getInstance().getMarkdown());
      }
    }
  };

  const handleSubmitButtonClick = async () => {
    if (!updatedTitle) {
      window.alert('게시물 입력을 입력해주세요');
      return;
    }

    if (!updatedContents) {
      window.alert('게시물 내용을 다시 입력해주세요');
      return;
    }

    await dispatch(updatePostToAxios(postId, {
      id: Number(postId),
      category,
      title: updatedTitle,
      contents: updatedContents
    }));
    history.replace(`/post/${postId}`);
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
                  value={updatedTitle}
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
              <Editor {...options}/>
              <Grid>
                <Button
                  sx={{ float: 'right', margin: '10px' }}
                  variant="contained"
                  type="button"
                  onClick={handleSubmitButtonClick}
                >
                  수정완료
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
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostEdit;
