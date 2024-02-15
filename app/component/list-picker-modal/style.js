import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {scale, widthToDp, heightToDp} from '../../utils';
import {size, fonts} from '../../themes';

const style = StyleSheet.create({
  modalContainer: {
    borderRadius: 20,
  },
  flexHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightToDp(0.5),
    backgroundColor: colorStrings.BLACK_PRIMARY,
    borderRadius: 20,
  },
  container: {},
  optionText: {
    padding: scale(1),
    fontFamily: fonts.CERA_BOLD,
    fontSize: size.LARGE,
  },
  option: {
    backgroundColor: colorStrings.WHITE_PRIMARY,
    margin: scale(1),
    borderBottomWidth: 1,
    borderBottomColor: colorStrings.DARK_GRAY,
  },
});
export default style;
