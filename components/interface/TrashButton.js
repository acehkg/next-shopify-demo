//chakra ui
import { IconButton } from '@chakra-ui/react';
//icons
import { FiTrash2 } from 'react-icons/fi';

const TrashButton = ({ handleTrash, size, ...rest }) => {
  return (
    <IconButton
      aria-label='Delete Item'
      icon={<FiTrash2 color={'red'} size={size} />}
      size='sm'
      onClick={handleTrash}
      {...rest}
    />
  );
};

export default TrashButton;
