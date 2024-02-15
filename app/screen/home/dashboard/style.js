import {StyleSheet} from 'react-native';
import {colorStrings} from '../../../constants';
import {heightToDp, scale, widthToDp} from '../../../utils';
const style = StyleSheet.create({
  container: {
    // height: '100%',
    flex: 1,
    backgroundColor: colorStrings.SNOW_WHITE,
  },
  topSection: {
    width: widthToDp(100),
    marginTop: 0,
    backgroundColor: colorStrings.COLOR_PRIMARY,
    borderBottomStartRadius: 1300,
    transform: [{scaleX: 1}],
  },
  // rupeeImage: {
  //   height: scale(8),
  //   width: scale(8),
  //   marginTop: heightToDp(-3.5),
  //   alignItems: 'center',
  //   marginLeft: widthToDp(15),
  // },
  leftCard: {
    width: widthToDp(45),
    height: heightToDp(12),
    backgroundColor: colorStrings.GAINSBORO,
    padding: scale(3),
    borderRadius: scale(2),
    marginRight: widthToDp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  rightCard: {
    width: widthToDp(45),
    height: heightToDp(12),
    backgroundColor: colorStrings.GAINSBORO,
    padding: scale(3),
    borderRadius: scale(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  // tripImage: {
  //   height: scale(8),
  //   width: scale(8),
  //   marginTop: heightToDp(-1.8),
  //   alignItems: 'center',
  //   marginLeft: widthToDp(7),
  // },
  topSectionBackgroundImage: {
    height: scale(25),
    width: scale(50),
    padding: 0,
    opacity: 40,
    alignSelf: 'flex-end',
  },

  headlineUserName: {
    color: 'white',
    marginTop: heightToDp(3),
    // marginLeft: widthToDp(5),
    // marginRight: -10,
  },
  // -----------------------------------------------
  header2: {
    width: widthToDp(50),
    height: heightToDp(24),
    position: 'relative',
    left: 20,
    borderRadius: 12,
    marginTop: -300,
    backgroundColor: 'transparent',
  },
  searchLoadBoxWrapper: {
    // height: heightToDp(17),
    width: widthToDp(90),
    alignSelf: 'center',
    borderRadius: scale(2),
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: colorStrings.WHITE_PRIMARY,
  },
  searchLoadBox: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthToDp(6),
    paddingVertical: heightToDp(1.5),
  },
  greenCircle: {
    height: heightToDp(2),
    width: widthToDp(3.7),
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 14 / 2,
  },

  grayLine: {
    height: heightToDp(0.1),
    width: widthToDp(90),
    backgroundColor: 'gray',
  },
  redCircle: {
    height: heightToDp(2),
    width: widthToDp(3.7),
    borderWidth: 1,
    borderColor: 'red',
    // marginTop: heightToDp(3),
    // marginLeft: widthToDp(4.3),
    borderRadius: 14 / 2,
  },
});

export default style;
