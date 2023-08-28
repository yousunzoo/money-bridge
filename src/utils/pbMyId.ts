export const getMyId = (userId: number | undefined, myId: number) => {
  const isId = userId === myId;
  if (isId) {
    return userId;
  }
  return null;
};
