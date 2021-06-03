import { RadioGroup, Radio, Stack, Text } from '@chakra-ui/react';

const RadioSelect = ({ filter, setFilter, optionOne, variants, spacing }) => {
  return (
    <RadioGroup defaultValue={filter} value={filter} onChange={setFilter}>
      <Stack direction='row' spacing={spacing}>
        {optionOne.values.map((value) => {
          return (
            <Radio key={value.value} value={value.value} colorScheme='gray'>
              {value.value}
            </Radio>
          );
        })}
      </Stack>
      <Stack direction='row' spacing={spacing}>
        {variants.map((variant) => {
          return (
            <Text key={variant.id}>
              ${variant.price}
              {variant.priceV2.currencyCode}
            </Text>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export default RadioSelect;
