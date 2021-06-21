import { useRadio, Box } from '@chakra-ui/react';

const LabelRadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input aria-label={props.label} {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='2px'
        borderRadius='md'
        boxShadow='md'
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default LabelRadioCard;
