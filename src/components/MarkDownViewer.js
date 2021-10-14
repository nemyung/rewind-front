import React from 'react';
/* eslint-disable */

// toast UI viewer
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

const MarkDownViewer = ({ option, content }) => {

    console.log(content)
  const viewerOpt = {
    initialValue: content,
    ...option,
  };

  return <Viewer {...viewerOpt} />;
};

export default MarkDownViewer;
