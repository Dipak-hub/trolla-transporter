import {StyleSheet} from 'react-native';
import {size} from '../../../themes';
import {heightToDp, scale, widthToDp} from '../../../utils';
const style = StyleSheet.create({
  statusIndicator: {
    // backgroundColor: 'green',
    color: 'white',
    fontSize: size.COMPACT,
    paddingVertical: heightToDp(0.5),
    paddingHorizontal: widthToDp(2.5),
    // borderRadius: scale(5),
  },
});

export default style;
