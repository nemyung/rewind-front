import { produce } from 'immer';

const initialState = {
  byId: {},
  allIds: [],
};

/*
  const initialPostState = {
    postId: postId<Number>,
    title: title<String>,
    author: userEmail<String>,
    nickname: userNickname<String>,
    contents: contents<String>,
    insertDt: ISOString<String>
  };
*/

export default function postsReducer(state = initialState, action) {
  return produce(state, (draft) => {
    console.log(draft);
    switch (action.type) {
      default:
        break;
    }
  });
}
