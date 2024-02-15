import {StyleSheet} from 'react-native';
import {heightToDp, scale, widthToDp} from '../../utils';
import {Dimensions} from 'react-native';
import {fonts, size} from '../../themes';
const style = StyleSheet.create({
  image: {
    alignSelf: 'center',
    width: scale(45),
    height: scale(45),
    marginTop: heightToDp(7),
  },
  listItemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: widthToDp(3),
    width: widthToDp(95),
    height: heightToDp(8),
    backgroundColor: '#FFDFDF',
    alignSelf: 'center',
    borderRadius: 17,
    marginTop: heightToDp(2),
  },
});

export default style;
