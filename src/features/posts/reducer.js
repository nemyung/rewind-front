/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import {
  LOAD_POST_LIST,
  CREATE,
  DELETE,
  UPDATE,
  ADD_COMMENT,
  LOAD_CURRENT_POST,
  REMOVE_COMMENT,
} from './types';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
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
    switch (action.type) {
      case LOAD_POST_LIST: {
        action.payload.forEach((document) => {
          draft.byId[document.id] = document;
          draft.allIds.push(document.id);
        });
        break;
      }
      case LOAD_CURRENT_POST: {
        const { postId, data } = action.payload;
        draft.current = data;
        draft.current.id = postId;
        break;
      }
      case CREATE: {
        console.log('CREATE');
        console.log(action.payload);
        const { id } = action.payload;
        draft.byId[id] = action.payload;
        draft.allIds.unshift(id);
        break;
      }
      case UPDATE: {
        console.log('UPDATE');
        console.log(action.payload);
        const { postId, updatedData } = action.payload;
        // updatedData의 key를 배열로 만든다.
        // [id, title, contents]
        Object.keys(updatedData).forEach((key) => {
          draft.byId[postId][key] = updatedData[key];
        });
        break;
      }
      case DELETE: {
        delete draft.byId[action.payload];
        draft.allIds = draft.allIds.filter(
          (id) => id !== Number(action.payload),
        );
        break;
      }
      case ADD_COMMENT: {
        draft.current.comments.unshift(action.payload);
        break;
      }
      case REMOVE_COMMENT: {
        const index = draft.current.comments.findIndex(
          (c) => c === action.payload,
        );
        console.log(index);
        draft.current.comments.splice(index, 1);
        break;
      }
      default:
        break;
    }
  });
}
