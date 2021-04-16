const createRandomUserName = () => {
  return "player" + Math.random().toString(36).substr(2, 9);
};
const reformatUserName = (userName: string) => {
  return userName.trim();
};
export default { createRandomUserName, reformatUserName };
