import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {scale, heightToDp, widthToDp} from '../../utils';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: heightToDp(6),
    width: widthToDp(100),
    backgroundColor: colorStrings.COLOR_PRIMARY,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
  },
  badge: {
    position: 'relative',
    right: widthToDp(5),
    bottom: heightToDp(2),
    backgroundColor: colorStrings.COLOR_PRIMARY_YELLOW,
    fontSize: scale(4),
    fontFamily: 'CeraPro-Bold',
  },
  title: {
    fontSize: scale(5.5),
  },
  helpText: {
    color: 'white',
    fontSize: scale(4),
    fontFamily: 'CeraPro-Bold',
  },
});

export default style;
