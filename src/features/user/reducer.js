/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { LOGIN, LOG_OUT } from './types';

const initialState = {
  email: '',
  nickname: '',
};

export default function userReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN: {
        console.log(draft);
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
