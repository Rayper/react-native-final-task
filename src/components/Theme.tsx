import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { createBox, createText, createTheme, useTheme as useReTheme } from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',

  cyan: '#2CB9B0',
  lightCyan: '#E7F9F7',
  darkBlue: '#0C0D34',
  orange: '#FE5E33',
  yellow: '#FFC641',
  pink: '#FF87A2',
  darkPink: '#FF0058',
  violet: '#442CB9',
  lightBlue: '#BFEAF5',
  grey: '#F4F0EF',
  darkGrey: '#808080',
};

export const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    danger: '#FF0058',
    primary: '#2CB9B0',
    black: '#0B0B0B',
    secondary: '#0C0D34',
    text: 'rgba(12, 13, 52, 0.7)',
    white: 'white',
    grey: '#F4F0EF',
    darkGrey: '#808080',
    lightGrey: '#FAFAFA',
    primaryLight: '#E7F9F7',
    outfitIdeasBg: '#1f90d9',
    outfirIdeasFooter: '#0e1b50',
    userCircle: '#311659',
    darkPurple: '#13042b',
    orange: '#FE5E33',
    yellow: '#FFC641',
    pink: '#FF87A2',
    darkPink: '#FF0058',
    violet: '#442CB9',
    lightBlue: '#BFEAF5',
    drawer1: palette.orange,
    drawer2: palette.yellow,
    drawer3: palette.pink,
    drawer4: palette.violet,
    info: palette.darkGrey,
    edit: palette.lightBlue,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    noRadius: 0,
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: 'SF-Pro-Display-Bold',
      color: 'white',
      textAlign: 'center',
    },
    title1: {
      fontSize: 28,
      fontFamily: 'SF-Pro-Display-Bold',
      color: 'secondary',
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: 'SF-Pro-Display-Semibold',
      color: 'secondary',
    },
    title3: {
      fontSize: 16,
      fontFamily: 'SF-Pro-Display-Semibold',
      color: 'secondary',
    },
    body: {
      fontSize: 16,
      lineHeight: 25,
      fontFamily: 'SF-Pro-Display-Semibold',
      color: 'text',
    },
    button: {
      fontSize: 15,
      fontFamily: 'SF-Pro-Display-Medium',
      color: 'text',
    },
    Header: {
      fontSize: 12,
      lineHeight: 24,
      fontFamily: 'SF-Pro-Display-Semibold',
      color: 'secondary',
    },
  },
});

export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export type Theme = typeof theme;
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
export const useTheme = () => useReTheme<Theme>();

// export default theme;
