import { useRadioGroup, Flex, Box, HStack } from '@chakra-ui/react';
import ColorRadioCard from './ColorRadioCard';

const ColorRadio = ({ options, name, onChange }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: `${name}`,
    defaultValue: options[0].value,
    onChange: onChange,
  });

  const group = getRootProps();
  return (
    <HStack {...group}>
      {options.map(({ value }) => {
        const radio = getRadioProps({ value });
        return (
          <ColorRadioCard color={value} key={value} {...radio}></ColorRadioCard>
        );
      })}
    </HStack>
  );
};

export default ColorRadio;
