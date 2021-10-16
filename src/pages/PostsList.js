import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import isEqaul from 'lodash/isEqual';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Paging from '../components/PageNation';
import PostTitle from '../components/PostTitle';
import { Grid } from '../elements';

import { loadPostsToAxios } from '../features/posts/actions';

const PostsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const postList = useSelector((state) => state.posts, isEqaul);

  React.useEffect(() => {
    if (postList.allIds.length !== 0) {
      return;
    }

    dispatch(loadPostsToAxios(String(0)));
  }, []);

  return (
    <Grid padding="50px 200px">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '60px' }} align="center">
                Cat.
              </StyledTableCell>
              <StyledTableCell sx={{ width: '500px' }} align="center">
                글제목
              </StyledTableCell>
              <StyledTableCell sx={{ width: '120px' }} align="center">
                작성자
              </StyledTableCell>
              <StyledTableCell sx={{ width: '120px' }} align="center">
                작성시간
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postList.allIds.map((id) => {
              return <PostTitle key={id} id={id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Paging />
      <Button
        sx={{ float: 'right', margin: '10px', fontWeight: 'bold' }}
        variant="contained"
        onClick={() => history.push('/new')}
      >
        글쓰기
      </Button>
    </Grid>
  );
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: '#FFF',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default PostsList;
