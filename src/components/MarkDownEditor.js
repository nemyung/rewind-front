import React from 'react';
import Prism from 'prismjs';

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

import { history } from '../features/configureStore';
import { Grid } from '../elements';

// import { uploadFile } from '../shared/uploadFile';
// import '../themes/toastEditor.css';

const MarkDownEditor = ({ option, functions }) => {
  const toastRef = React.useRef(null);
  const [contents, setContents] = React.useState({ contents: '' });

  const getContent = () => {
    const getMarkDown = toastRef.current.getInstance().getMarkdown();
    console.log(getMarkDown);
    setContents(getMarkDown);
  };

  const defaultOpt = {
    previewStyle: 'vertical',
    initialEditType: 'markdown',
    height: '600px',
    useCommandShortcut: true,
    previewHighlight: false,
    ref: { toastRef },
    // colorSyntax: 글자 색 바꾸는 기능 / condeSyntaxHighlight : 언어에 따른 코드 색 변경
    plugins: [colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]],
    // plugins: [colorSyntax],
    initialValue: '',
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
    </>
  );
};

export default MarkDownEditor;
