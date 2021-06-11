import { IconButton } from '@chakra-ui/react';
import { RiInstagramLine } from 'react-icons/ri';

const InstaButton = ({ url, size, ...rest }) => {
  return (
    <IconButton
      as='a'
      href={url}
      {...rest}
      icon={<RiInstagramLine size={size} />}
    />
  );
};

export default InstaButton;
