import {StyleSheet} from 'react-native';
import {colorStrings} from '../../../constants';
import {heightToDp, scale, widthToDp} from '../../../utils';

const style = StyleSheet.create({
  container: {
    flex: 0,
    // paddingTop: heightToDp(1),
    height: '100%',
    paddingHorizontal: widthToDp(1),
    backgroundColor: colorStrings.WHITE_PRIMARY,
  },
  chipBox: {
    flexDirection: 'row',
    padding: scale(3),
    backgroundColor: colorStrings.WHITE_PRIMARY,
  },
  chip: {
    marginLeft: widthToDp(0),
    marginRight: widthToDp(1),
    backgroundColor: 'transparent',
    borderRadius: 5,
    // borderWidth: 2,
    // borderColor: colorStrings.SNOW_WHITE,
  },
});

export default style;
