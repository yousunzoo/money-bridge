export const chunkArray = (data: any[], size: number) => {
  const arr = [];

  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + 8));
  }
  return arr;
};
