import React from 'react';
import { isAlltrue } from '../utils';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(email, pw);
  };
  const showButton = isAlltrue(email, pw);

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="email">
        <input
          required
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        <input
          required
          type="password"
          minLength={6}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </label>
      <button type="submit" disabled={!showButton}>
        로그인 하기
      </button>
    </form>
  );
};

export default Login;
