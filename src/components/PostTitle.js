import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { ReactComponent as NodeIcon } from '../assets/node.svg';
import { ReactComponent as ReactIcon } from '../assets/react.svg';
import { ReactComponent as SpringIcon } from '../assets/spring.svg';

import { history } from '../features/configureStore';

const iconStyle = {
  width: '24px',
  height: '24px',
};

const PostTitle = ({ id = '' }) => {
  const title = useSelector((state) => state.posts.byId);
  const toDay = title[id].insertDt.split('T')[0];

  const moveToPostDetail = () => {
    history.push(`/post/${id}`);
  };

  return (
    <>
      <TableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="center">
          {title[id].category === 'REACT' && <ReactIcon style={iconStyle} />}
          {title[id].category === 'NODE' && <NodeIcon style={iconStyle} />}
          {title[id].category === 'SPRING' && <SpringIcon style={iconStyle} />}
        </TableCell>
        <TableCell onClick={moveToPostDetail} align="left">
          {title[id].title}
        </TableCell>
        <TableCell align="center">{title[id].nickname}</TableCell>
        {/* <TableCell align="left">{title[id].insertDt}</TableCell> */}
        <TableCell align="center">{toDay}</TableCell>
      </TableRow>
    </>
  );
};

PostTitle.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PostTitle;
