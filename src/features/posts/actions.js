// /* eslint-disable no-unused-vars */
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

// ActionCreator

export const changeCategory = (category) => ({
  type: CHANGE_CATEGORY,
  payload: category,
});

export const loadPosts = (postList, totalPages) => ({
  type: LOAD_POST_LIST,
  payload: { postList, totalPages },
});

export const loadCurrentPost = (postId, data) => ({
  type: LOAD_CURRENT_POST,
  payload: { postId, data },
});

export const createPost = (newPost) => ({
  type: CREATE,
  payload: newPost,
});

export const updatePost = (updatedData) => ({
  type: UPDATE,
  payload: { updatedData },
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
    console.log(currentPage);
    const pageNumber = currentPage;
    console.log(pageNumber);
    // const pageNumber = currentPage;
    const res = await axios.get(`${baseURL}/posts/${pageNumber}`);
    console.log(`${baseURL}/posts/${pageNumber}`);

    const {
      data: {
        posts: { content, totalPages },
      },
    } = res;
    console.log('response: ', res);
    console.log(totalPages);

    dispatch(loadPosts(content, totalPages));
    // dispatch(loadPosts(content));
  } catch (e) {
    console.log(e);
  }
};

export const loadCurrentPostToAxios = (postId) => async (dispatch) => {
  try {
    const { data } = await T.GET(`/post/${postId}`);
    console.log(data);
    dispatch(loadCurrentPost(Number(postId), data));
  } catch (error) {
    console.error(error);
  }
};

export const createPostToAxios = (post) => async (dispatch) => {
  try {
    console.log(post);
    const res = await T.POST('/post', post);
    console.log(res);
    // 현재 response는 success 밖에 없음

    dispatch(createPost(res.data.post));
  } catch (e) {
    console.log(e);
  }
};

export const updatePostToAxios =
  (postId, updateContents) => async (dispatch) => {
    const res = await T.UPDATE('/post', postId, updateContents);
    dispatch(updatePost(res.data));
    console.log(res.data);
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
