import { useSate, useEffect } from 'react';
import {
  Heading,
  Text,
  Box,
  Flex,
  Button,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react';

const ProductSelector = ({ product, setSelected }) => {
  //No variants. Only one option
  if (product.variants.length === 1) {
    setSelected(product.variants[0]);
    return (
      <Flex>
        <Button>BUY NOW</Button>
      </Flex>
    );
  }
  //Less than 5 variants.Use Radio.
  if (product.variants.length <= 5) {
    const options = product.options;
    console.log(options[0].values);
    return options.map((option) => {
      return (
        <RadioGroup>
          <Stack direction='row'>
            {option.values.map((value) => {
              return <Radio>{value.value}</Radio>;
            })}
          </Stack>
        </RadioGroup>
      );
    });
  }
  /*More than 5 variants. Use multiple selects.
  return (
    <Select placeholder='Select option'>
      <option value='option1'>Option 1</option>
      <option value='option2'>Option 2</option>
      <option value='option3'>Option 3</option>
    </Select>
  );*/
  return <h1>TEST</h1>;
};
export default ProductSelector;
