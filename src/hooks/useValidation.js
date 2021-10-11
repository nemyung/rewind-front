import React from 'react';

export default function useValidation(validationFunc, initialValue) {
  const [state, setState] = React.useState(initialValue);
  const [isValid, setIsValid] = React.useState(() => validationFunc(state));
  const onChange = React.useCallback(
    (nextState) => {
      const value =
        typeof nextState === 'function' ? nextState(state) : nextState;

      setState(value);
      setIsValid(validationFunc(value));
    },
    [validationFunc],
  );

  return [state, setIsValid, onChange, isValid];
}
