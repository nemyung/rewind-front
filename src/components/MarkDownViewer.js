/* eslint-disable */
import React from 'react';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import 'prismjs/themes/prism.css';
import '../styles/toastEditor.css';


const MarkDownViewer = ({ option, content }) => {
  const viewerOpt = {
    initialValue: content,
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
    ...option,
  };

  return <Viewer {...viewerOpt} />;
};

export default MarkDownViewer;
