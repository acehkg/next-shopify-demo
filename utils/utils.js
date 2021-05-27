export const createNumberOptions = (number) => {
  let options = [];
  let i = 1;
  while (i < number) {
    const option = {
      key: i,
      value: i,
      text: i,
    };

    i++;
    options.splice(0, 0, option);
  }
  return options;
};
