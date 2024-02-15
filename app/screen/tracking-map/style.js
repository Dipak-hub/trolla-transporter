import {StyleSheet} from 'react-native';
import {heightToDp, scale, widthToDp} from '../../utils';
import {size} from '../../themes';
import {colorStrings} from '../../constants';

const style = StyleSheet.create({
  container: {
    backgroundColor: colorStrings.SNOW_WHITE,
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 'center',
    paddingBottom: heightToDp(20),
  },
  mapContainer: {
    flex: 1,
  },
});

export default style;
