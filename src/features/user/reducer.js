/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { LOGIN, LOG_OUT } from './types';

const initialState = {
  email: '',
  nickname: '',
  isAuthorized: false,
};

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN: {
        draft.email = action.payload.email;
        draft.nickname = action.payload.nickname;
        draft.isAuthorized = true;
        break;
      }
      case LOG_OUT: {
        draft.email = '';
        draft.nickname = '';
        draft.isAuthorized = false;
        break;
      }
      default:
        break;
    }
  });
}
