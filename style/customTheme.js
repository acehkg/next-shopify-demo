// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
// 2. Call `extendTheme` and pass your custom values
const customTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'Roboto',
    heading: 'Roboto',
  },
});

export default customTheme;
