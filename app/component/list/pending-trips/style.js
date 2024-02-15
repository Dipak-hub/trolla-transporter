import {StyleSheet} from 'react-native';
import {colorStrings} from '../../../constants';
import {size, fonts} from '../../../themes';
import {heightToDp, scale, widthToDp} from '../../../utils';

const style = StyleSheet.create({
  container: {
    height: 'auto',
    width: 'auto',
    backgroundColor: colorStrings.SNOW_WHITE,
    borderRadius: 5,
    shadowColor: colorStrings.BLACK_PRIMARY,
    shadowOpacity: 1,
    padding: 0,
    marginTop: heightToDp(2),
    marginBottom: heightToDp(1),
    borderColor: colorStrings.DARK_GRAY_2,
    borderWidth: 1,
  },
  header: {
    backgroundColor: colorStrings.SNOW_WHITE,
    padding: 10,
    borderRadius: 5,
  },
  middle: {
    backgroundColor: colorStrings.WHITE_SMOKE,
    justifyContent: 'space-between',
    padding: 10,
  },

  bottom: {
    flexDirection: 'row',
    backgroundColor: colorStrings.WHITE_SMOKE,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 3,
  },
  quoteCounter: {
    backgroundColor: colorStrings.LIGHT_PINK,
    paddingHorizontal: scale(3),
    paddingVertical: scale(2),
    borderRadius: scale(5),
    marginTop: heightToDp(-4),
    marginRight: widthToDp(3),
  },
});

export default style;
