export const isNumeric = (value: string | number) => {
  // if (typeof value === 'number') return !isNaN(value);
  // // if (!value) return false;

  // // @ts-ignore
  // return !isNaN(parseInt(value)) && !isNaN(value);

  // @ts-ignore
  return !isNaN(value);
};
