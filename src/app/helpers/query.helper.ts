const isValid = (value: any) => value != null && value !== "";

const removeUselessQueryItems = (obj: any) =>
  Object.entries(obj)
    .filter(([_, value]) => isValid(value))
    .reduce((acc, cur) => {
      const copyAcc: any = { ...acc };
      copyAcc[cur[0]] = cur[1];
      return copyAcc;
    }, {});

export { removeUselessQueryItems };
