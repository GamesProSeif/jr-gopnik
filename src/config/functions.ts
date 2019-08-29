export const capitalize = (str: string): string => {
  return (
    str.charAt(0).toUpperCase() +
    str
      .slice(1)
      .toString()
      .toLowerCase()
  );
};

export const getRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const clean = (text: string): string => {
  if (typeof text === 'string') {
    return text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203));
  } else {
    return text;
  }
};
