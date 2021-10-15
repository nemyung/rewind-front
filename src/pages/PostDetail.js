import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';

import MarkDownViewer from '../components/MarkDownViewer';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { Grid } from '../elements';
import {
  deletePostToAxios,
  loadCurrentPostToAxios,
} from '../features/posts/actions';

const PostDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: postId } = useParams();

  const currentUserEmail = useSelector((state) => state.user.email);
  const currentPost = useSelector((state) => state.posts.current);
  const isCurrentPostLoaded = Boolean(Object.keys(currentPost).length);

  const authorEmail = currentPost?.author;
  const createdAt = currentPost?.insertDt?.split('T')[0];
  const isCurrentUserPost = authorEmail === currentUserEmail;

  const deletePost = async () => {
    try {
      await dispatch(deletePostToAxios(postId));
      history.replace('/');
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (isCurrentPostLoaded && postId === currentPost.id) {
      return;
    }
    dispatch(loadCurrentPostToAxios(postId));
  }, []);

  if (!isCurrentPostLoaded) {
    return null;
  }

  return (
    <Grid main width="100%" height="100%">
      <Container
        maxWidth="md"
        sx={{ padding: '60px 20px 20px 20px', width: '80%' }}
      >
        <Card component="article" square>
          <Grid padding="0px 30px">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <CardHeader
                  title={currentPost?.title}
                  subheader={createdAt}
                  sx={{ mr: 2 }}
                />
                <Typography>{currentPost?.nickname}</Typography>
              </Stack>
              {isCurrentUserPost && (
                <ButtonGroup
                  variant="text"
                  aria-label="current user button group"
                >
                  <Button onClick={() => history.push(`/post/${postId}/edit`)}>
                    수정
                  </Button>
                  <Button onClick={deletePost}>삭제</Button>
                </ButtonGroup>
              )}
            </Stack>
            <Divider />
            <CardContent sx={{ minHeight: '300px' }}>
              <MarkDownViewer content={currentPost?.contents} />
            </CardContent>
            <Divider />
            <CardContent>
              <Grid>
                <CommentForm id={postId} />
                <CommentList />
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Container>
    </Grid>
  );
};

export default PostDetail;
