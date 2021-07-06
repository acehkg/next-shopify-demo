import { useRadioGroup, HStack, Text } from '@chakra-ui/react';
import LabelRadioCard from './LabelRadioCard';

const LabelRadio = ({ options, name, onChange }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: `${name}`,
    defaultValue: options[0],
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <LabelRadioCard key={value} label={value} {...radio}>
            <Text>{value}</Text>
          </LabelRadioCard>
        );
      })}
    </HStack>
  );
};

export default LabelRadio;
