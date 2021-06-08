import { useRadioGroup, HStack } from '@chakra-ui/react';
import LabelRadioCard from './LabelRadioCard';

const LabelRadio = ({ options, name, onChange }) => {
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
          <LabelRadioCard key={value} {...radio}>
            {value}
          </LabelRadioCard>
        );
      })}
    </HStack>
  );
};

export default LabelRadio;
