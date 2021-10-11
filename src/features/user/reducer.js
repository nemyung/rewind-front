/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { SIGN_UP, LOGIN, LOG_OUT } from './types';

const initialState = {
  email: '',
  nickname: '',
};

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SIGN_UP: {
        const { email, nickname } = action.payload;
        draft.email = email;
        draft.nickname = nickname;
        break;
      }
      case LOGIN: {
        break;
      }
      case LOG_OUT: {
        break;
      }
      default:
        break;
    }
  });
}
