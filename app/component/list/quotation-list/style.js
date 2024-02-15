import {StyleSheet} from 'react-native';
import {colorStrings} from '../../../constants';
import {heightToDp, scale, widthToDp} from '../../../utils';
import {Dimensions} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 420,
  },
  quotationContainer: {
    backgroundColor: colorStrings.COLOR_PRIMARY_YELLOW,
    marginVertical: heightToDp(2),
    marginHorizontal: widthToDp(2),
  },
});

export default style;
