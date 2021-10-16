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

  const isMobile = window.matchMedia('(max-width: 525px)').matches;
  const isWeb = window.matchMedia('(min-width: 829px)').matches;
  const isTablet = window.matchMedia('(min-width: 768px').matches;

  if (!isCurrentPostLoaded) {
    return null;
  }

  return (
    <Grid width="100%" height="100%">
      <Container
        sx={{
          padding: isTablet ? '60px 20px 20px 20px' : 0,
        }}
      >
        <Card
          component="article"
          square
          sx={{
            width: isWeb ? '80%' : '100%',
            margin: '0 auto',
            height: isMobile ? '100vh' : 'auto',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center">
              <CardHeader
                title={currentPost?.title}
                subheader={createdAt}
                sx={{ mr: 1 }}
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
          <CardContent sx={{ minHeight: isMobile ? '350px' : '300px' }}>
            <MarkDownViewer content={currentPost?.contents} />
          </CardContent>
          <Divider />
          <CardContent>
            <Grid>
              <CommentForm id={postId} />
              <CommentList />
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default PostDetail;
