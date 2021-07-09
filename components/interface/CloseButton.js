import { IconButton } from '@chakra-ui/react';
import { IoClose } from 'react-icons/io';

const CloseButton = ({ size, ...rest }) => {
  return (
    <IconButton aria-label='Close' {...rest} icon={<IoClose size={size} />} />
  );
};

export default CloseButton;
