export const whitespaceValidation = (text) => {
  return text.trim() === text && text.split(' ').length === 1;
};
export const passwordLengthValidation = (text) => {
  return text.length >= 8;
};
export const emailTypeValidation = (text) => {
  return text.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') !== null;
};
export const nicknameLengthValidation = (text) => {
  return text.length >= 5;
};
export const passwordContainValidation = (text) => {
  return text.match('[a-zA-Z]') && text.match('[0-9]');
};
export const nicknameValidation = (nickname) => {
  return nicknameLengthValidation(nickname) && whitespaceValidation(nickname);
};
export const passwordsMatchValidation = (textOne, textTwo) => {
  return textOne === textTwo;
};
export const emailValidation = (email) => {
  return whitespaceValidation(email) && emailTypeValidation(email);
};
export const passwordValidation = (password) => {
  return (
    whitespaceValidation(password) &&
    passwordLengthValidation(password) &&
    passwordContainValidation(password)
  );
};
