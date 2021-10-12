import { LOAD, CREATE, DELETE, UPDATE } from './types';
import axiosInstace from '../../api/axiosInstace';

// ActionCreator
export const loadPosts = (postList) => ({
  type: LOAD,
  payload: postList,
});

export const createPost = (newPost) => ({
  type: CREATE,
  payload: { newPost },
});

export const updatePost = (postId, updatedData) => ({
  type: UPDATE,
  payload: { postId, updatedData },
});

export const deletePost = (postId) => ({
  type: DELETE,
  payload: postId,
});

// MiddleWare
export const loadPostsToAxios = () => async (dispatch) => {
  try {
    const postList = await axiosInstace.getPost();
    dispatch(loadPosts(postList.data));
  } catch (e) {
    console.log(e);
  }
};

export const createPostToAxios = (post) => async (dispatch) => {
  try {
    const newPost = await axiosInstace.createPost(post);
    dispatch(createPost(newPost));
  } catch (e) {
    console.log(e);
  }
};

/* eslint-disable */
export const updatePostToAxios = (postId, newPost) => async (dispatch) => {
  const editPost = await axiosInstace.editPost(postId, newPost);
  console.log(editPost);
};
