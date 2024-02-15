import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {heightToDp, scale, widthToDp} from '../../utils';

const style = StyleSheet.create({
  documentImage: {
    height: heightToDp(16),
  },
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(2),
    backgroundColor: colorStrings.SNOW_WHITE,
    paddingTop: heightToDp(2),
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  accordionSize: {
    marginTop: heightToDp(2),
    marginHorizontal: widthToDp(3),
    backgroundColor: colorStrings.DARK_GRAY_2,
    paddingLeft: 0,
    borderRadius: scale(2),
    paddingBottom: 0,
    paddingTop: 0,
  },
  progessBarContainer: {
    marginVertical: heightToDp(1),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  personalDetailsBar: {
    margin: 5,
    alignItems: 'center',
  },
  activeBar: {
    width: widthToDp(25),
    height: heightToDp(0.6),
    backgroundColor: '#1eb15a',
    borderRadius: 10,
    marginVertical: heightToDp(1.5),
  },
  inactiveBar: {
    width: widthToDp(25),
    height: heightToDp(0.6),
    backgroundColor: colorStrings.DARK_GRAY,
    borderRadius: 10,
    marginVertical: heightToDp(1.5),
  },
  progressBarTextActive: {
    color: '#1eb15a',
  },
  progressBarTextinActive: {
    color: colorStrings.DARK_GRAY,
  },
  button: {
    width: widthToDp(40),
    marginVertical: heightToDp(3),
  },
});

export default style;
