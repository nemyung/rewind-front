import React from 'react';
/* eslint-disable */

// toast UI viewer
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

const MarkDownViewer = ({ option }) => {
  const viewerOpt = {
    initialValue: '> 뷰어 동작 하냐?',
    ...option,
  };

  return <Viewer {...viewerOpt} />;
};

export default MarkDownViewer;
