import React from 'react';
import Prism from 'prismjs';

import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
/* eslint-disable */

// toast UI editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import {
  createPostToAxios,
  updatePostToAxios,
} from '../features/posts/actions';

import { history } from '../features/configureStore';
import { Grid } from '../elements';

// import { uploadFile } from '../shared/uploadFile';
import '../styles/toastEditor.css';

const MarkDownEditor = ({ option, category, title,updateTitle, currentPost }) => {
  const dispatch = useDispatch();
  const toastRef = React.useRef(null);

  // const [contents, setContents] = React.useState('');
  console.log(currentPost);

  const getContent = () => {
    const getMarkDown = toastRef.current.getInstance().getMarkdown();
    console.log(getMarkDown);
    console.log(category, title, getMarkDown);
    dispatch(createPostToAxios({ category, title, contents: getMarkDown }));
    history.replace('/');
  };

  // {
  //   id : postId<String>,
  //   title : title<String>,
  //   contents : contents<String>
  // }
  console.log(currentPost)

  const updatePost = () => {
    const getMarkDown = toastRef.current.getInstance().getMarkdown();
    dispatch(
      updatePostToAxios(currentPost.id, {
        id: currentPost.id,
        category:category,
        title: updateTitle,
        contents: getMarkDown,
      }),
    );
    history.replace(`/post/${currentPost.id}`);
  };

  const defaultOpt = {
    previewStyle: 'vertical',
    initialEditType: 'markdown',
    height: '600px',
    useCommandShortcut: true,
    previewHighlight: false,
    ref: toastRef,
    // colorSyntax: 글자 색 바꾸는 기능 / condeSyntaxHighlight : 언어에 따른 코드 색 변경
    plugins: [colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]],
    // plugins: [colorSyntax],
    initialValue: currentPost ?currentPost.contents : '',
    // hooks: {
    //   addImageBlobHook: async (blob, callback) => {
    //     const imgUrl = await uploadFile(blob);
    //     callback(imgUrl, 'alt text');
    //   },
    // },
  };

  const resultOpt = {
    ...defaultOpt,
    ...option,
  };

  return (
    <>
      <Editor {...resultOpt} />
      <Grid>
        <Button
          sx={{ float: 'right', margin: '10px' }}
          variant="contained"
          type="button"
          onClick={currentPost ? updatePost : getContent}
        >
          {currentPost? '수정완료' : '작성완료'}
        </Button>
        <Button
          sx={{ float: 'right', margin: '10px' }}
          variant="outlined"
          type="button"
          onClick={() => {
            history.replace('/');
          }}
        >
          돌아가기
        </Button>
      </Grid>
    </>
  );
};

export default MarkDownEditor;