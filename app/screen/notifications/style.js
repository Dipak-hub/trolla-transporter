import {StyleSheet} from 'react-native';
import {heightToDp, scale, widthToDp} from '../../utils';
import {size} from '../../themes';
import {colorStrings} from '../../constants';

const style = StyleSheet.create({
  empty: {
    backgroundColor: colorStrings.SNOW_WHITE,
    paddingHorizontal: scale(2),
    paddingVertical: heightToDp(5),
    borderRadius: scale(1),
    // marginTop: heightToDp(5),
  },
});

export default style;
