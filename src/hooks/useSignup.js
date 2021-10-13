import React from 'react';
import axios from 'axios';
import { validateInput } from '../utils';

const SUCCESS = 'success';
const serverURI = process.env.REACT_APP_REMOTE_SERVER_URI;

export default function useSignup(after) {
  const [loading, setLoading] = React.useState(false);
  const [failMessage, setFailMessage] = React.useState('');

  const onSubmit = React.useCallback(async (email, pw, pwCheck, nickname) => {
    setLoading(true);
    setFailMessage('');
    const invalidationMessage = validateInput(email, pw, pwCheck);

    if (invalidationMessage) {
      setFailMessage(invalidationMessage);
      setLoading(false);
      return;
    }

    try {
      const body = { email, pw, pwCheck, nickname };
      const response = await axios.post(`${serverURI}/signup`, body);
      const { data } = response;
      const { result, errorMessage = '' } = data;
      console.log(data);

      setLoading(false);
      if (result === SUCCESS) {
        after();
      } else {
        setFailMessage(errorMessage);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return [loading, failMessage, onSubmit];
}
