export const truncateContent = (content: string, maxLength: number) => {
  if (content.length <= maxLength) {
    return content;
  }
  return content.slice(0, maxLength) + "...";
};
