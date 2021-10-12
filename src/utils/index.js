export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const matchPasswordLength = (password) => {
  return password.length >= 6 && password.length <= 20;
};

export const validateInput = (email, password, passwordAgain) => {
  if (!validateEmail(email)) {
    return '유효하지 않은 이메일 형식입니다.';
  }

  if (!matchPasswordLength(password)) {
    return '비밀번호는 6자 이상 20자 이하로 설정해주세요.';
  }

  if (passwordAgain && !matchPasswordLength(passwordAgain)) {
    return '비밀번호는 6자 이상 20자 이하로 설정해주세요.';
  }

  if (!(password === passwordAgain)) {
    return '입력하신 비밀번호가 서로 다릅니다.';
  }

  return null;
};

export const isAllTrue = (...args) => {
  return args.every(Boolean);
};
