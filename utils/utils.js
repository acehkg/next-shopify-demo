export const createNumberOptions = (number) => {
  let options = [];
  let i = 1;
  while (i < number) {
    const option = {
      value: i,
      label: i,
    };

    i++;
    options.splice(0, 0, option);
  }
  return options;
};
