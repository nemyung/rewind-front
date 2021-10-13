import axios from 'axios';

const serverURL = process.env.REACT_APP_LOCAL_SERVER_URI;
const instance = axios.create({
  baseURL: serverURL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
});

export default {
  // baseURL을 미리 지정해줬기 때문에 함수의 첫 번째 인자에 들어가는 url은
  // get과 delete의 경우 두 번째 인자에 데이터를 담아 보낼수 없기 때문에 서버에 데이터를 보낼경우 쿼리를 이용하여 보내주도록 합니다.

  // 게시물 불러오기
  getPost: () => instance.get('/posts'),
  // 게시물 작성하기
  createPost: (post) => instance.post('/posts', post),

  // 게시물 수정하기
  editPost: (id, content) => instance.put(`/posts/${id}`, content),
  // 게시물 삭제하기
  delPost: (id) => instance.delete(`/posts/${id}`),
};
