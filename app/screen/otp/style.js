import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants/index';
import {heightToDp, scale, widthToDp} from '../../utils';

const style = StyleSheet.create({
  textInput: {
    width: scale(15),
    height: scale(9),
    // backgroundColor: 'white',
    color: colorStrings.BLACK_PRIMARY,
    textAlign: 'center',
    borderBottomWidth: widthToDp(0.5),
    borderBottomColor: colorStrings.BLACK_PRIMARY,
    borderRadius: widthToDp(1),
    padding: widthToDp(1),
    fontSize: scale(3.5),
    fontWeight: 'bold',
    marginHorizontal: widthToDp(0.5),
  },
  inputBoxContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp(10),
    paddingVertical: heightToDp(5),
  },
  resendOtp: {
    flex: 0,
    alignItems: 'center',
    backgroundColor: colorStrings.DARK_GRAY_2,
    width: '100%',
    paddingVertical: widthToDp(1.4),
    marginVertical: heightToDp(1),
    borderRadius: widthToDp(1),
    alignSelf: 'center',
  },
  enterOtpText: {
    textAlign: 'center',
    marginTop: heightToDp(2),
  },
  image: {
    height: heightToDp(25),
    width: widthToDp(100),
    marginTop: heightToDp(5),
  },
  // buttonText: {
  //   color: 'white',
  //   fontSize: widthToDp(3.5),
  //   padding: scale(1),
  // },
  // imageContainer: {
  //   height: heightToDp(40),
  //   width: widthToDp(100),
  //   alignItems: 'center',
  // },
  // buttonContainer: {
  //   // backgroundColor: 'green',
  //   justifyContent: 'center',
  //   paddingHorizontal: widthToDp(10),
  //   paddingVertical: heightToDp(1),
  // },
});

export default style;
