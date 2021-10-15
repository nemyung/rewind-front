import React from 'react';
import styled from 'styled-components';
import isEqual from 'lodash/isEqual';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import { styled as s } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { loadPostsToAxios } from '../features/posts/actions';

import { ReactComponent as NodeIcon } from '../assets/node.svg';
import { ReactComponent as ReactIcon } from '../assets/react.svg';
import { ReactComponent as SpringIcon } from '../assets/spring.svg';

const StyledTableCell = s(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3F51B5',
    color: '#FFF',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = s(TableRow)(() => ({
  '& *': {
    color: '#212121',
  },
}));

const iconStyle = {
  width: '24px',
  height: '24px',
};

const PostsListResponsive = () => {
  const posts = useSelector((state) => {
    const { byId } = state.posts;
    const mapppedData = Object.keys(byId).reduce((acc, key) => {
      const { category = '', id = 0, title = '', nickname = '' } = byId[key];
      acc.push({ category, id, title, nickname });
      return acc;
    }, []);
    return mapppedData;
  }, isEqual);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (posts.length !== 0) {
      return;
    }
    dispatch(loadPostsToAxios());
  }, []);

  return (
    <Table
      size="small"
      sx={{ maxWidth: '100%', width: '100%', margin: '0 auto' }}
    >
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Cat.</StyledTableCell>
          <StyledTableCell>글제목</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((post) => (
          <StyledTableRow key={post.id}>
            <TableCell align="left" sx={{ width: '5%' }}>
              {post.category === 'REACT' && <ReactIcon style={iconStyle} />}
              {post.category === 'NODE' && <NodeIcon style={iconStyle} />}
              {post.category === 'SPRING' && <SpringIcon style={iconStyle} />}
            </TableCell>
            <TableCell>
              <StyledLink to={`/post/${post.id}`}>
                {post.title || 'hello world'}
              </StyledLink>
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default PostsListResponsive;
