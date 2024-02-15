import {StyleSheet} from 'react-native';
import {colorStrings} from '../../../constants';
import {fonts, size} from '../../../themes';
import {
  heightToDp,
  scale,
  widthToDp,
} from '../../../utils/responsive/responsive';

const style = StyleSheet.create({
  container: {
    marginBottom: heightToDp(2),
    // paddingBottom: heightToDp(2),
    backgroundColor: colorStrings.WHITE_PRIMARY,
    borderColor: colorStrings.DARK_GRAY_2,
    borderWidth: 2,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colorStrings.DARK_GRAY_2,
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp(2),
    paddingVertical: heightToDp(0.4),
    alignItems: 'center',
  },
  middle: {
    // flexDirection: 'row',
    backgroundColor: colorStrings.WHITE_SMOKE,
    justifyContent: 'space-between',
    padding: scale(2),
  },
  footer: {
    backgroundColor: colorStrings.SNOW_WHITE,
    padding: scale(1),
    borderRadius: 5,
  },
});

export default style;
