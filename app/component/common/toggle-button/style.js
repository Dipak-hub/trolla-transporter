import {StyleSheet} from 'react-native';
import {heightToDp, scale, widthToDp} from '../../../utils';
import {colorStrings} from '../../../constants';
const style = StyleSheet.create({
  toggleButtonView: {
    flexDirection: 'row',
    borderColor: colorStrings.DARK_GRAY_2,
    borderWidth: 1,
    borderRadius: 10,
    flex: 0,
  },
  button: {
    // paddingHorizontal: widthToDp(0),
    // paddingVertical: heightToDp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(2),
    flex: 1,
  },
});

export default style;
