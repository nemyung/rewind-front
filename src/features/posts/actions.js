import axios from 'axios';
import {
  CHANGE_CATEGORY,
  LOAD_POST_LIST,
  LOAD_CURRENT_POST,
  CREATE,
  DELETE,
  UPDATE,
  ADD_COMMENT,
  MODIFY_COMMENT,
  REMOVE_COMMENT,
} from './types';

import T from '../../api/tokenInstance';

export const changeCategory = (category) => ({
  type: CHANGE_CATEGORY,
  payload: category,
});

export const loadPosts = (postList, totalElements) => ({
  type: LOAD_POST_LIST,
  payload: { postList, totalElements },
});

export const loadCurrentPost = (postId, data) => ({
  type: LOAD_CURRENT_POST,
  payload: { postId, data },
});

export const createPost = (newPost) => ({
  type: CREATE,
  payload: newPost,
});

export const updatePost = (updatedPost) => ({
  type: UPDATE,
  payload: updatedPost,
});

export const deletePost = (postId) => ({
  type: DELETE,
  payload: postId,
});

export const addCommentToPost = (addedComment) => ({
  type: ADD_COMMENT,
  payload: addedComment,
});

export const modifyCommentToPost = (commentId, newComment) => ({
  type: MODIFY_COMMENT,
  payload: { commentId, newComment },
});

export const removeCommentToPost = (commentId) => ({
  type: REMOVE_COMMENT,
  payload: commentId,
});

const baseURL = process.env.REACT_APP_REMOTE_SERVER_URI;

export const loadPostsToAxios = (currentPage) => async (dispatch) => {
  try {
    const pageNumber = currentPage;
    const res = await axios.get(`${baseURL}/posts/${pageNumber}`);

    const {
      data: {
        posts: { content, totalElements },
      },
    } = res;
    dispatch(loadPosts(content, totalElements));
  } catch (error) {
    console.error(error);
  }
};

export const loadCurrentPostToAxios = (postId) => async (dispatch) => {
  try {
    const { data } = await T.GET(`/post/${postId}`);
    dispatch(loadCurrentPost(Number(postId), data));
  } catch (error) {
    console.error(error);
  }
};

export const createPostToAxios = (post) => async (dispatch) => {
  try {
    const res = await T.POST('/post', post);

    dispatch(createPost(res.data.post));
  } catch (error) {
    console.error(error);
  }
};

export const updatePostToAxios =
  (postId, updateContents) => async (dispatch) => {
    const {
      data: { post },
    } = await T.UPDATE('/post', postId, updateContents);
    dispatch(updatePost(post));
  };

export const deletePostToAxios = (postId) => async (dispatch) => {
  try {
    await T.DELETE('/post', postId);
    dispatch(deletePost(postId));
  } catch (error) {
    console.error(error);
  }
};

export const addCommentToAxios = (postId, comment) => async (dispatch) => {
  let addedComment;

  try {
    const { data } = await T.POST('/comment', { postId, comment });
    addedComment = data;
  } catch (error) {
    console.error(error);
  }
  dispatch(addCommentToPost(addedComment));
};

export const modifyCommentToAxios =
  (commentId, updatedComment) => async (dispatch) => {
    const payload = { id: commentId, comment: updatedComment };
    try {
      const { data } = await T.UPDATE('/comment', commentId, payload);
      if (data.result === 'success') {
        dispatch(modifyCommentToPost(commentId, data.comment));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const removeCommentToAxios = (commentId) => async (dispatch) => {
  try {
    const { data } = await T.DELETE('/comment', commentId);
    if (data.result === 'success') {
      dispatch(removeCommentToPost(commentId));
    }
  } catch (error) {
    console.error(error);
  }
};
