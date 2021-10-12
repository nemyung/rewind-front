import { SIGN_UP, LOGIN } from './types';

const signup = (payload) => ({
  type: SIGN_UP,
  payload,
});

const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const signupToServer =
  (email, pw, pwCheck, nickname) => async (dispatch) => {
    // validationLogic

    dispatch({ email, nickname });
  };

export const checkAuthToServer = (token) => async (dispatch) => {};
