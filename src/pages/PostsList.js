import React from 'react';

import isEqaul from 'lodash/isEqual';

import { useDispatch, useSelector } from 'react-redux';
import PostTitle from '../components/PostTitle';
import { loadPostsToAxios } from '../features/posts/actions';

const PostsList = () => {
  const dispatch = useDispatch();
  // 반환하는 값이 객체나 배열일 때 isEqaul
  // 모든 객체 랜더링이 아닌 특정 객체만 랜더링 됨
  const postList = useSelector((state) => state.posts, isEqaul);

  React.useEffect(() => {
    // if (postList.length !== 0) {
    //   return;
    // }
    dispatch(loadPostsToAxios());
  }, []);

  console.log(postList.allIds);

  return (
    <>
      {postList.allIds.map((id, idx) => {
        return <PostTitle key={id} id={id} idx={idx} />;
      })}
    </>
  );
};

export default PostsList;
