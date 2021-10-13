import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { history } from '../features/configureStore';

// import { Grid, Text } from '../elements/index';

const PostTitle = ({ id = '', idx = '' }) => {
  const title = useSelector((state) => state.posts.byId);
  const toDay = title[id].insertDt.split('T')[0];

  const moveToPostDetail = () => {
    history.push(`/detail/${id}`);
  };

  return (
    <>
      <TableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell align="center">{idx}</TableCell>
        <TableCell onClick={moveToPostDetail} align="left">
          {title[id].title}
        </TableCell>
        <TableCell align="center">{title[id].nickname}</TableCell>
        {/* <TableCell align="left">{title[id].insertDt}</TableCell> */}
        <TableCell align="center">{toDay}</TableCell>
      </TableRow>

      {/* <Grid bg="#EEE" is_flex width="80%" padding="0px 60px" margin="50px auto">
        <Grid bg="red" width="150px" margin="0px 30px">
          <Text>{idx}</Text>
        </Grid>
        eslint-disable
        솔직히 온클릭 잡는건 과하다 생각합니다.
        <Grid bg="blue" margin="0px 30px" _onClick = {moveToPostDetail}>
          <Text>{title[id].title}</Text>
        </Grid>
        <Grid>
        <Grid bg="green">
          <Text>{title[id].nickname}</Text>
        </Grid>
        <Grid>
          <Text bg="blue">{title[id].insertDt}</Text>
        </Grid>
        </Grid>
      </Grid> */}
    </>
  );
};

PostTitle.propTypes = {
  id: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
};

export default PostTitle;
