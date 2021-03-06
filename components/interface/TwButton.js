import { IconButton } from '@chakra-ui/react';
import { RiTwitterLine } from 'react-icons/ri';

const TwButton = ({ url, size, ...rest }) => {
  return (
    <IconButton
      as='a'
      aria-label='Twitter'
      href={url}
      {...rest}
      icon={<RiTwitterLine size={size} />}
    />
  );
};

export default TwButton;
