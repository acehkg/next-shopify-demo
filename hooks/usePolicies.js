const usePolicies = (policies) => {
  const array = Object.entries(policies);
  const flattened = array.map((i) => {
    return i[1];
  });

  return flattened;
};

export default usePolicies;
