import React from 'react';
import { validateEmail, matchPasswordLength } from '../utils';

export default function useValidation(type, initialValue) {
  const [state, setState] = React.useState(
    typeof initialValue === 'function' ? initialValue() : initialValue,
  );

  const [isStateValid, setIsStateValid] = React.useState(true);

  const onChange = React.useCallback((nextState) => {
    const value =
      typeof nextState === 'function' ? nextState(state) : nextState;
    setState(value);

    if (value.length === 0) {
      setIsStateValid(true);
      return;
    }

    if (type === 'email') {
      setIsStateValid(validateEmail(value));
      return;
    }

    if (type === 'password') {
      setIsStateValid(matchPasswordLength(value));
    }
  }, []);

  return [state, isStateValid, onChange];
}
