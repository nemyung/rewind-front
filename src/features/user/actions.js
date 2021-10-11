import { SIGN_UP } from './types';

const signup = (payload) => ({
  type: SIGN_UP,
  payload,
});

const signupToServer = (email, pw, pwCheck, nickname) => async (dispatch) => {
  // validationLogic

  dispatch({ email, nickname });
};
