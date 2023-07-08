export const getMyId = (
  role: string | undefined,
  userId: number | undefined,
  myId: number,
  myRole: string | undefined,
) => {
  const isRole = role === myRole;
  const isId = userId === myId;
  if (isRole && isId) {
    return userId;
  }
  return null;
};
