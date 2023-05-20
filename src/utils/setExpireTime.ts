export const setExpireTime = (hour: number) => {
  return new Date(Date.now() + hour * 60 * 60 * 1000);
};
