import { IconButton } from '@chakra-ui/react';
import { RiFacebookBoxLine } from 'react-icons/ri';

const FbButton = ({ url, size, ...rest }) => {
  return (
    <IconButton
      as='a'
      aria-label='Facebook'
      href={url}
      {...rest}
      icon={<RiFacebookBoxLine size={size} />}
    />
  );
};

export default FbButton;
