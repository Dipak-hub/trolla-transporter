import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants/index';
import {heightToDp, scale, widthToDp} from '../../utils';

const style = StyleSheet.create({
  documentImage: {
    height: '100%',
    width: '100%',
    borderWidth: 3,
    borderColor: colorStrings.GAINSBORO,
    transform: [{rotate: '0deg'}],
  },
  bottomController: {
    flex: 1,
    backgroundColor: colorStrings.SNOW_WHITE,
    marginBottom: heightToDp(10),
  },
});

export default style;
