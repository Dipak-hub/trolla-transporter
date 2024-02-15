import {StyleSheet} from 'react-native';
import {colorStrings} from '../constants';
import {heightToDp, scale} from '../utils';

const style = StyleSheet.create({
  iconImage: {
    height: scale(6.5),
    width: scale(6.5),
  },
  iconImageFocused: {
    tintColor: colorStrings.GRAPH_FRUITS,
    height: scale(7.5),
    width: scale(7.5),
  },

  label: {
    color: colorStrings.BLACK_PRIMARY,
  },
  labelFocused: {
    color: colorStrings.GRAPH_FRUITS,
  },
});
export default style;
