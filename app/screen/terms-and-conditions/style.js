import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {heightToDp, scale, widthToDp} from '../../utils';

const style = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    padding: scale(3),
  },
  webView: {flex: 1}
});

export default style;
