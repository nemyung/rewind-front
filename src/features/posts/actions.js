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

import axiosInstace from '../../api/axiosInstace';
import T from '../../api/tokenInstance';

// ActionCreator

export const changeCategory = (category) => ({
  type: CHANGE_CATEGORY,
  payload: category,
});

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

export const modifyCommentToPost = (commentId, newComment) => ({
  type: MODIFY_COMMENT,
  payload: { commentId, newComment },
});

export const removeCommentToPost = (commentId) => ({
  type: REMOVE_COMMENT,
  payload: commentId,
});

const baseURL = process.env.REACT_APP_REMOTE_SERVER_URI;

export const loadPostsToAxios = () => async (dispatch) => {
  try {
    const pageNumber = 0;
    const res = await axios.get(`${baseURL}/posts/${pageNumber}`);
    const {
      data: {
        posts: { content },
      },
    } = res;
    console.log('response: ', res);

    dispatch(loadPosts(content));
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
