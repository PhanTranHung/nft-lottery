// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: '#f7fafc',
      900: '#1a202c',
    },
  },
});

export default theme;
