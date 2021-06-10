const usePolicies = (policies) => {
  const array = Object.entries(policies);
  const lastRemoved = array.slice(0, -1);
  const flattened = lastRemoved.map((i) => {
    return i[1];
  });
  return flattened;
};

export default usePolicies;
