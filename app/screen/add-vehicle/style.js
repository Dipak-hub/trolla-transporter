import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {scale, heightToDp} from '../../utils';
const style = StyleSheet.create({
  chip: {
    margin: scale(1),
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colorStrings.WHITE_SMOKE,
  },
  textInput: {
    height: heightToDp(6),
    fontSize: scale(4),
  },
  documentImage: {
    height: heightToDp(13),
  },
});

export default style;
