export const truncateContent = (content: string, maxLength: number) => {
  const text = content.replace(/<[^>]+>/g, "").replace("&nbsp", " ");
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};
