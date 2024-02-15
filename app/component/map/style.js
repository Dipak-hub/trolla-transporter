import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {heightToDp, scale, widthToDp} from '../../utils';

const style = StyleSheet.create({
  mapContainer: {
    marginTop: heightToDp(1),
    borderWidth: 1,
    borderColor: colorStrings.TOMATO,
  },
  map: {
    height: heightToDp(35),
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default style;
