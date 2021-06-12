import { IconButton } from '@chakra-ui/react';
import { RiInstagramLine } from 'react-icons/ri';

const InstaButton = ({ url, size, ...rest }) => {
  return (
    <IconButton
      as='a'
      aria-label='Instagram'
      href={url}
      {...rest}
      icon={<RiInstagramLine size={size} />}
    />
  );
};

export default InstaButton;
