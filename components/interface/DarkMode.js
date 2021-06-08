import { useColorMode, IconButton } from '@chakra-ui/react';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';

const DarkMode = ({ ...rest }) => {
  // color mode toggle from Chakra
  const { colorMode, toggleColorMode } = useColorMode();

  if (colorMode === 'light') {
    return (
      <IconButton
        aria-label='Dark Mode'
        onClick={toggleColorMode}
        icon={<IoIosMoon size={24} />}
        {...rest}
      />
    );
  }

  return (
    <IconButton
      aria-label='Dark Mode'
      onClick={toggleColorMode}
      icon={<IoIosSunny size={24} />}
      {...rest}
    />
  );
};

export default DarkMode;
