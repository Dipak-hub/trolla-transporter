import {configureFonts, DefaultTheme} from 'react-native-paper';
import {colorStrings} from './../constants';

const fontConfig = {
  android: {
    regular: {
      fontFamily: 'CeraPro-Bold',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'CeraPro-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'CeraPro-Bold',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'CeraPro-Bold',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colorStrings.COLOR_PRIMARY,
    accent: colorStrings.COLOR_PRIMARY_YELLOW,
  },
  fonts: configureFonts(fontConfig),
};
export default theme;
