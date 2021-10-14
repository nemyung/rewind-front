/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  LOAD_POST_LIST,
  CREATE,
  DELETE,
  UPDATE,
  ADD_COMMENT,
  LOAD_CURRENT_POST,
} from './types';
import axiosInstace from '../../api/axiosInstace';
import T from '../../api/tokenInstance';

// ActionCreator
export const loadPosts = (postList) => ({
  type: LOAD_POST_LIST,
  payload: postList,
});
export const loadCurrentPost = (postId, data) => ({
  type: LOAD_CURRENT_POST,
  payload: { postId, data },
});

export const createPost = (newPost) => ({
  type: CREATE,
  payload: newPost,
});

export const updatePost = (postId, updatedData) => ({
  type: UPDATE,
  payload: { postId, updatedData },
});

export const deletePost = (postId) => ({
  type: DELETE,
  payload: postId,
});

export const addCommentToPost = (addedComment) => ({
  type: ADD_COMMENT,
  payload: addedComment,
});

const baseURL = process.env.REACT_APP_REMOTE_SERVER_URI;

export const loadPostsToAxios = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseURL}/posts`);
    const {
      data: { posts },
    } = res;
    // const postList = await axiosInstace.getPost();
    dispatch(loadPosts(posts));
  } catch (e) {
    console.log(e);
  }
};

export const loadCurrentPostToAxios = (postId) => async (dispatch) => {
  try {
    const { data } = await T.GET(`/post/${postId}`);
    console.log(data);
    dispatch(loadCurrentPost(postId, data));
  } catch (error) {
    console.error(error);
  }
};

export const createPostToAxios = (post) => async (dispatch) => {
  try {
    console.log(post);
    const res = await T.POST('/posts/new', post);
    console.log(res);
    // 현재 response는 success 밖에 없음

    dispatch(createPost(post));
  } catch (e) {
    console.log(e);
  }
};

// 로컬에서 사용한 로직
export const updatePostToAxios =
  (postId, updateContents) => async (dispatch, getState) => {
    const isPost = getState().posts.byId[postId];
    // 바꿀 내용을 axios에 올리면 백에서 바뀐 원본데이터를 받아오는걸로 알고있는데
    // 제가 구현한 방식은 업데이트가 완료 된 포스트를 그냥 DB에 올리는 것 같습니다.
    const updateStatePost = { ...isPost, ...updateContents };
    const editPost = await axiosInstace.editPost(postId, updateStatePost);
    console.log(editPost.data);
    // editPost안에 postId 들어있는데
    // 굳이 리듀서에도 postId를 넘겨줘야 하나?
    // 세명님이 보시고 알려주시겠죠?ㅎㅎ;
    dispatch(updatePost(postId, editPost.data));
  };

// API 명세서 대로 전달 합니다.
// {
//   id : postId<String>,
//   title : title<String>,
//   contents : contents<String>
// }
// /post/{id}

// export const updatePostToAxios = (updateContents) => async (dispatch) => {
//   const editPost = await axiosInstace.editPost(updateContents);
//   dispatch(updatePost(postId ,editPost.data));
// };

export const deletePostToAxios = (postId) => async (dispatch) => {
  try {
    console.log('deletePostToAxiosLogging Start');
    const res = await T.DELETE('/post', postId);
    console.log(res);
    console.log('deletePostToAxiosLogging End');
    dispatch(deletePost(postId));
  } catch (error) {
    console.error(error);
  }
};

export const addCommentToAxios = (postId, comment) => async (dispatch) => {
  let addedComment;

  try {
    const { data } = await T.POST('/comment', { postId, comment });
    // console.log('CommentToAxiosLogging Start');
    // console.log(data);
    // console.log('CommentToAxiosLogging End');
    addedComment = data;
  } catch (error) {
    console.error(error);
  }
  console.log(addedComment);
  dispatch(addCommentToPost(addedComment));
};
