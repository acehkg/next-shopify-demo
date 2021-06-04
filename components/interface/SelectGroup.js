import { Select } from '@chakra-ui/react';

const SelectGroup = ({ values, onChange, size }) => {
  return (
    <Select size={size} onChange={onChange}>
      {values.map((value) => {
        return (
          <option key={value.value} value={value.value}>
            {value.value}
          </option>
        );
      })}
    </Select>
  );
};

export default SelectGroup;
