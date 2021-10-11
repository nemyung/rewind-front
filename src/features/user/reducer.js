import { produce } from 'immer';

const initialState = {
  email: '',
  nickname: '',
};

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
    }
  });
}
