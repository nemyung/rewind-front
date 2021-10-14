import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { updatePostToAxios } from '../features/posts/actions';
// import { history } from '../features/configureStore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '../elements';

/* eslint-disable */

const PostEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [updateTitle, setUpdateTitle] = React.useState('');
  const [updateContents, setUpdateContents] = React.useState('');

  const editPost = () => {
    // postid, contents
    dispatch(
      // 로컬 테스트
      // updatePostToAxios(params.id, {
      //   title: updateTitle,
      //   contents: updateContents,
      // }),

      // 명세 된 형식으로 보냄.
      updatePostToAxios({
        id: params.id,
        title: updateTitle,
        contents: updateContents,
      }),
    );
    console.log(params);
    console.log(updateTitle);
    console.log(updateContents);
  };

  const editTitle = (e) => {
    setUpdateTitle(e.target.value);
  };

  const editContents = (e) => {
    setUpdateContents(e.target.value);
  };

  return (
    <Grid>
      <Grid
        width="80%"
        padding="60px 20px 20px 20px"
        margin="auto"
        height="80%"
      >
        <Card sx={{ height: '100%' }}>
          <Grid padding="0px 30px">
            <Grid is_flex>
              <CardHeader title={isPost?.title} subheader={toDay} />
              {isPost?.nickname}
            </Grid>
          </Grid>
          <hr style={{ width: '90%', margin: 'auto' }} />
          <Grid padding="0px 30px">
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {isPost?.contents}
              </Typography>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

{
  /* <>
      <div>
        <label htmlFor="postTitle">
          제목
          <input id="postTitle" type="text" onChange={editTitle} />
        </label>
      </div>
      <div>
        <label htmlFor="postWrite">
          게시글 내용
          <textarea
            id="postDesc"
            placeholder="게시글 입력"
            type="text"
            onChange={editContents}
          />
        </label>
      </div>
      <div>
        <button type="button" onClick={editPost}>
          작성완료
        </button>
        <button
          type="button"
          onClick={() => {
            history.push('/');
          }}
        >
          돌아가기
        </button>
      </div>
    </> */
}

export default PostEdit;
