import React from 'react';
import styled from 'styled-components';
import isEqual from 'lodash/isEqual';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { styled as s } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import Paging from '../components/PageNation';

import { ReactComponent as NodeIcon } from '../assets/node.svg';
import { ReactComponent as ReactIcon } from '../assets/react.svg';
import { ReactComponent as SpringIcon } from '../assets/spring.svg';
import { loadPostsToAxios } from '../features/posts/actions';

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
    color: '#757575',
    fontSize: 14,
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
  const history = useHistory();

  React.useEffect(() => {
    if (posts.length !== 0) {
      return;
    }
    dispatch(loadPostsToAxios());
  }, []);

  const isMobile = window.matchMedia('(max-width: 425px').matches;
  const is600pxOver = window.matchMedia('(min-width: 600px)').matches;

  return (
    <section style={{ position: 'relative' }}>
      <Table
        size="small"
        sx={{
          maxWidth: '600px',
          width: '100%',
          margin: `${is600pxOver ? '32px' : '0'} auto`,
        }}
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
      <IconButton
        sx={{
          position: 'fixed',
          width: '48px',
          height: '48px',
          borderRadius: '99em',
          backgroundColor: '#303F9F',
          bottom: isMobile ? '10%' : '5%',
          right: isMobile ? '4%' : '5%',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
        onClick={() => history.push('/new')}
      >
        <AddIcon sx={{ color: '#fff' }} />
      </IconButton>
      <Paging />
    </section>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default PostsListResponsive;
