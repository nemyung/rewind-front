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
  console.log(postId);
  const delPost = await axiosInstace.delPost(postId);
  const postList = await axiosInstace.getPost();
  console.log(delPost);
  console.log(postList.data);

  dispatch(deletePost(postList.data));
};
