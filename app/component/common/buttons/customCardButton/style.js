import {StyleSheet} from 'react-native';
import {colorStrings} from '../../../../constants';
import {size} from '../../../../themes';
import {heightToDp, scale, widthToDp} from '../../../../utils';

const style = StyleSheet.create({
  wrapper: {
    // justifyContent: 'center',
    alignSelf: 'center',
    width: widthToDp(90),
    borderRadius: scale(4),
    backgroundColor: colorStrings.COLOR_PRIMARY_YELLOW,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
    fontWeight: 'bold',
    color: colorStrings.BLACK_PRIMARY,
    letterSpacing: 2,
  },
});

export default style;
