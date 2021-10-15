/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import {
  CHANGE_CATEGORY,
  LOAD_POST_LIST,
  CREATE,
  DELETE,
  UPDATE,
  ADD_COMMENT,
  LOAD_CURRENT_POST,
  MODIFY_COMMENT,
  REMOVE_COMMENT,
} from './types';

const initialState = {
  byId: {},
  allIds: [],
  current: {},
  page: {},
  category: 'ALL',
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
      case CHANGE_CATEGORY: {
        draft.category = action.payload;
        break;
      }
      case LOAD_POST_LIST: {
        console.log(action.payload);
        draft.byId = {};
        draft.allIds = [];
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
        draft.current = action.payload;
        draft.byId[action.payload.id].title = action.payload.title;
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
      case MODIFY_COMMENT: {
        const { commentId, newComment } = action.payload;
        const index = draft.current.comments.findIndex(
          (c) => c.id === commentId,
        );
        draft.current.comments[index] = newComment;
        break;
      }
      case REMOVE_COMMENT: {
        const index = draft.current.comments.findIndex(
          (c) => c.id === action.payload,
        );
        draft.current.comments.splice(index, 1);
        break;
      }
      default:
        break;
    }
  });
}
