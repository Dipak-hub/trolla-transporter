import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {heightToDp, scale, widthToDp} from '../../utils';

const style = StyleSheet.create({
  topCard: {
    marginTop: heightToDp(2),
    // paddingBottom: heightToDp(2),
    paddingHorizontal: widthToDp(2),
    paddingVertical: heightToDp(2),
    backgroundColor: colorStrings.LIGHT_PINK,
    borderColor: colorStrings.DARK_GRAY_2,
    borderWidth: 2,
    borderRadius: 5,
  },
  status: {
    backgroundColor: colorStrings.GAINSBORO,
    paddingHorizontal: scale(3),
    paddingVertical: scale(1),
    borderRadius: scale(5),
    marginTop: heightToDp(-4),
    marginRight: widthToDp(1),
    marginBottom: heightToDp(1),
  },
});

export default style;
