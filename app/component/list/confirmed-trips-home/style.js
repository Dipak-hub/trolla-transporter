import {StyleSheet} from 'react-native';
import {colorStrings} from '../../../constants';
import {size, fonts} from '../../../themes';
import {heightToDp, widthToDp, scale} from '../../../utils';

const style = StyleSheet.create({
  container: {
    height: 'auto',
    width: 'auto',
    backgroundColor: colorStrings.SNOW_WHITE,
    borderRadius: 5,
    shadowColor: colorStrings.BLACK_PRIMARY,
    shadowOpacity: 1,
    padding: 0,
    marginTop: heightToDp(1.5),
    borderColor: colorStrings.DARK_GRAY_2,
    borderWidth: 1,
  },
  header: {
    backgroundColor: colorStrings.SNOW_WHITE,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  middle: {
    flexDirection: 'row',
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
  statusIndicator: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: size.COMPACT,
    paddingVertical: heightToDp(0.5),
    paddingHorizontal: widthToDp(2.5),
    borderRadius: scale(5),
    marginLeft: widthToDp(2),
  },
});

export default style;
