/* eslint-disable */
import React from 'react';
import Prism from 'prismjs';

import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

import { validatePost } from '../utils';
import {
  createPostToAxios,
  updatePostToAxios,
} from '../features/posts/actions';

import { history } from '../features/configureStore';
import { Grid } from '../elements';

import '../styles/toastEditor.css';

const MarkDownEditor = ({
  option,
  category,
  title,
  updateTitle,
  currentPost,
}) => {
  const dispatch = useDispatch();
  const toastRef = React.useRef(null);

  const getContent = async () => {
    const getMarkDown = toastRef.current.getInstance().getMarkdown();
    if (!validatePost(title, getMarkDown)) {
      return;
    }
    await dispatch(
      createPostToAxios({ category, title, contents: getMarkDown }),
    );
    history.replace('/');
  };

  const updatePost = async () => {
    const getMarkDown = toastRef.current.getInstance().getMarkdown();
    if (!validatePost(title, getMarkDown)) {
      return;
    }
    await dispatch(
      updatePostToAxios(currentPost.id, {
        id: currentPost.id,
        category,
        title: updateTitle,
        contents: getMarkDown,
      }),
    );
    history.replace(`/post/${currentPost.id}`);
  };

  const isBelowTablet = window.matchMedia('(max-width: 768px)').matches;

  const defaultOpt = {
    previewStyle: isBelowTablet ? "tab" : 'vertical',
    initialEditType: 'markdown',
    height: isBelowTablet ? '550px' : '600px',
    useCommandShortcut: true,
    previewHighlight: false,
    ref: toastRef,
    plugins: [colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]],
    initialValue: currentPost ? currentPost.contents : '',
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
          {currentPost ? '수정완료' : '작성완료'}
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
