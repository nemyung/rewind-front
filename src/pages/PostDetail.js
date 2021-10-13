import React from 'react';
import isEqaul from 'lodash/isEqual';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// import PropTypes from 'prop-types';

// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import CommentList from '../components/CommentList';
// import CommentForm from '../components/CommentForm';
// import { Grid, Text } from '../elements';
import { deletePostToAxios } from '../features/posts/actions';
import { history } from '../features/configureStore';

// import PostEdit from './PostEdit';

/* eslint-disable */

const PostDetail = (props) => {
  const { userEmail, email } = props;
  const dispatch = useDispatch()
  const params = useParams();
  const postList = useSelector((state) => state.posts.byId, isEqaul);
  const isPost = postList[params.id];
  // 서버 연결 시 주석 제거
  // const toDay = isPost?.insertDt.split('T')[0];
  // const userInfo = useSelector((state) => state.user.email);

  // const isMe = userInfo === isPost.email;
  const isMe = userEmail === email;

  const moveToPostEdit = () => {
    history.push(`/edit/${props.match.params.id}`)
  }

  const deletePost = () => {
    dispatch(deletePostToAxios(params.id))
    history.push(`/edit/${props.match.params.id}`)
  }

  console.log(isMe);

  console.log(isPost);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      
     
      
    </Card>
    // <Grid padding='50px 200px'>
    //   <Grid>
    //     <Text bold size='20px'>{isPost?.title}</Text>
    //   </Grid>
    //   <div
    //     style={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'space-between',
    //     }}
    //   >
    //     <p>{isPost?.nickname}</p>
    //     <p>{isPost?.insrtDt}</p>
    //     {isMe && <button type="button" onClick = {moveToPostEdit}>수정</button>}
    //     {isMe && <button type="button" onClick = {deletePost}>삭제</button>}
    //   </div>
    //   <div>
    //     <p>{isPost?.contents}</p>
    //   </div>
    //   <div>
    //     <p>댓글 {isPost?.commentCnt}개</p>
    //   </div>
    //   <Grid>
    //     <CommentForm />
    //     <CommentList />
    //   </Grid>
    // </Grid>
  );
};

PostDetail.defaultProps = {
  email: 'aaa@aaa.com',
  userEmail: 'aaa@aaa.com',
};

export default PostDetail;
