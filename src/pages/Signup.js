import React from 'react';
import useValidation from '../hooks/useValidation';
import { validateEmail, matchPasswordLength, isAlltrue } from '../utils';

const Signup = () => {
  const [email, , onEmailChange, isEmailValid] = useValidation(
    validateEmail,
    '',
  );

  const [pw, , onPwChange, isPwEnoughLength] = useValidation(
    matchPasswordLength,
    '',
  );

  const [pwAgain, , onPwAgainChange, isPwAgainEnoughLength] = useValidation(
    matchPasswordLength,
    '',
  );

  const showButton = isAlltrue(
    email,
    pw,
    pwAgain,
    isEmailValid,
    isPwEnoughLength,
    isPwAgainEnoughLength,
    pw === pwAgain,
  );

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">
          이메일 주소를 입력해주세요
          <input
            required
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          {!isEmailValid && '이메일의 형식을 맞추어주세요'}
        </label>
        <label htmlFor="password">
          비밀번호를 입력해주세요
          <input
            required
            id="password"
            type="password"
            value={pw}
            onChange={(e) => onPwChange(e.target.value)}
            minLength={6}
          />
          {!isPwEnoughLength && '패스워드는 최소 6자 이상이어야 합니다.'}
        </label>
        <label htmlFor="passwordAgain">
          비밀번호를 다시 한 번 입력해 주세요
          <input
            required
            id="passwordAgain"
            type="password"
            value={pwAgain}
            onChange={(e) => onPwAgainChange(e.target.value)}
            minLength={6}
          />
          {!isPwAgainEnoughLength && '패스워드는 최소 6자 이상이어야 합니다.'}
        </label>
        <button type="submit" disabled={!showButton}>
          제출
        </button>
      </form>
    </>
  );
};

export default Signup;
