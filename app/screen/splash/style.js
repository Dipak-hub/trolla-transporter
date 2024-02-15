import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {heightToDp, widthToDp} from '../../utils';
const style = StyleSheet.create({
  container: {
    paddingHorizontal: widthToDp(1),
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: heightToDp(10),
    backgroundColor: colorStrings.SNOW_WHITE,
    height: '100%',
  },
});

export default style;
