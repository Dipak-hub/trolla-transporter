import {StyleSheet} from 'react-native';
import {heightToDp, scale, widthToDp} from '../../../utils';
import {size} from '../../../themes';
import {colorStrings} from '../../../constants';

const style = StyleSheet.create({
  listContainer: {
    justifyContent: 'space-evenly',
    width: widthToDp(95),
    height: heightToDp(10),
    backgroundColor: '#FFDFDF',
    // alignSelf: 'center',
    borderRadius: 17,
    marginBottom: 20,
    paddingHorizontal: widthToDp(5),
  },
  listImage: {
    height: scale(7),
    width: scale(7),
  },
});

export default style;
