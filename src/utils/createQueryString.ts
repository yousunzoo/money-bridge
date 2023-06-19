export const createQueryString = (name: string, value: string, sort: string) => {
  const params = new URLSearchParams();
  params.set(name, value);
  params.set("sort", sort);
  return params.toString();
};
