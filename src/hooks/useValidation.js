import React from 'react';

export default function useValidation(validationFunc, initialValue) {
  const [state, setState] = React.useState(initialValue);
  const [isValid, setIsValid] = React.useState(true);
  const onChange = React.useCallback(
    (nextState) => {
      const value =
        typeof nextState === 'function' ? nextState(state) : nextState;

      setState(value);
      if (value.length === 0) {
        setIsValid(true);
      } else {
        setIsValid(validationFunc(value));
      }
    },
    [validationFunc],
  );

  return [state, setIsValid, onChange, isValid];
}
