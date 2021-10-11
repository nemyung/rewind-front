import { produce } from 'immer';

const initialState = {
  byId: {},
  allIds: [],
};

/*
  const initialComment = {
    id: <Number>,
    postId: <Number>,
    email: userEmail<String>,
    nickname: userNickname<String>,
    insertDt: ISOString<String>
  };
*/

export default function commentsReducer(state = initialState, action) {
  return produce(state, (draft) => {
    console.log(draft);
    switch (action.type) {
      default:
        break;
    }
  });
}
