import React from 'react';
import { useHistory } from 'react-router-dom';

import isEqaul from 'lodash/isEqual';

import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Grid } from '../elements';

import { loadPostsToAxios } from '../features/posts/actions';
import PostTitle from '../components/PostTitle';

/* eslint-disable */
const PostsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // 반환하는 값이 객체나 배열일 때 isEqaul
  // 모든 객체 랜더링이 아닌 특정 객체만 랜더링 됨
  const postList = useSelector((state) => state.posts, isEqaul);

  React.useEffect(() => {
    if (postList.allIds.length !== 0) {
      return;
    }
    dispatch(loadPostsToAxios());
    
  }, []);

  return (
    <>
      <Grid padding='50px 200px'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650}} size='small' aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{width:'60px', }} align='center'>No.</StyledTableCell>
                <StyledTableCell sx={{width:'500px', backgroundColor : 'blue'}} align='center'>글제목</StyledTableCell>
                <StyledTableCell sx={{width:'120px', backgroundColor : 'green'}} align='center'>작성자</StyledTableCell>
                <StyledTableCell sx={{width:'120px', backgroundColor : 'yellow'}} align='center'>작성시간</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {postList.allIds.map((id, idx) => {
              return <PostTitle key={id} id={id} idx={idx} />;
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <button onClick={() => history.push('/new')}>우석쿤</button>
      </Grid>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:'#A2D2FF',
    color: '#343F56',
    fontWeight:'bold',
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default PostsList;
