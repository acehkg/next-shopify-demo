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
        display='flex'
        justifyContent='center'
        alignItems='center'
        cursor='pointer'
        borderWidth='2px'
        borderRadius='md'
        boxShadow='md'
        height='3rem'
        width='3rem'
        textAlign='center'
        _focus={{
          boxShadow: 'outline',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default LabelRadioCard;
