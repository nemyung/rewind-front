import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginToServer } from '../features/user/actions';
import { validateInput } from '../utils';
import { saveToken } from '../utils/auth';

export default function useLogin() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [failMessage, setFailMessage] = React.useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormSubmit = React.useCallback(async (email, pw) => {
    setIsLoading(true);
    setFailMessage('');
    const invalidationMessage = validateInput(email, pw);

    if (invalidationMessage) {
      setFailMessage(invalidationMessage);
      setIsLoading(false);
      return;
    }

    let data;

    try {
      data = await dispatch(loginToServer(email, pw));
    } catch (e) {
      console.error(e);
    }

    if (data?.errorMessage) {
      setFailMessage(data.errorMessage);
      setIsLoading(false);
      return;
    }

    saveToken(data.token);
    setIsLoading(false);
    history.replace('/');
  }, []);

  return [isLoading, failMessage, handleFormSubmit];
}
