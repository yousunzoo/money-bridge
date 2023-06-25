export const showName = (name: string) => {
    return name.length > 2 ? name[0] + "*" + name.slice(2) : name;
  };