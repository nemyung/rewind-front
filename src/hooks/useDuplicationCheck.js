import React from 'react';
import axios from 'axios';

const serverURI = process.env.REACT_APP_REMOTE_SERVER_URI;
const SUCCESS = 'success';
const SUCCESS_MESSAGE_EMAIL = '중복된 이메일이 없습니다!';
const SUCCESS_MESSAGE_NICKNAME = '중복된 닉네임이 없습니다!';

export default function useDuplicationCheck(type) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [failMessage, setFailMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const checkDuplicate = React.useCallback(async (input) => {
    setIsLoading(true);
    setFailMessage('');
    setSuccessMessage('');

    const key = type === 'id' ? 'email' : 'nickname';
    try {
      const response = await axios.post(
        `${serverURI}/signup/duplicate_${type}`,
        {
          [key]: input,
        },
      );

      const {
        data: { result, message },
      } = response;

      if (result === SUCCESS) {
        if (type === 'id') {
          setSuccessMessage(SUCCESS_MESSAGE_EMAIL);
        } else {
          setSuccessMessage(SUCCESS_MESSAGE_NICKNAME);
        }
      } else {
        setFailMessage(message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, failMessage, successMessage, checkDuplicate];
}
