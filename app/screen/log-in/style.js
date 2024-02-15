import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants/index';
import {heightToDp, scale, widthToDp} from '../../utils';
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(6),
    backgroundColor: colorStrings.WHITE_PRIMARY,
  },
  textInput: {
    fontSize: scale(3.8),
    backgroundColor: colorStrings.WHITE_PRIMARY,
  },
  image: {
    height: heightToDp(25),
    width: 'auto',
    marginTop: heightToDp(5),
  },

  termsAndConditionText: {
    alignSelf: 'baseline',
    textAlign: 'justify',
    marginTop: heightToDp(1),
    color: colorStrings.TEXT_SECONDARY,
  },
  bottomTextLink: {
    alignSelf: 'baseline',
    textAlign: 'justify',
    letterSpacing: 0.7,
    color: colorStrings.TOMATO,
    textDecorationLine: 'underline',
  },

  loginContainer: {
    // paddingHorizontal: widthToDp(5),
    paddingVertical: heightToDp(5),
  },
  trollaLogo: {
    height: scale(10.5),
    width: scale(40),
    marginTop: heightToDp(3),
    alignSelf: 'flex-start',
  },
  trollaLogoSmall: {
    height: scale(5.5),
    width: scale(22),
    marginTop: heightToDp(3),
    alignSelf: 'flex-start',
  },
  loginButton: {
    marginTop: heightToDp(2),
    justifyContent: 'center',
    width: '100%',
    height: heightToDp(4),
    backgroundColor: colorStrings.COLOR_PRIMARY,
    alignItems: 'center',
    borderRadius: scale(2),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scale(3.5),
    letterSpacing: 4,
  },
  bottomSection: {
    flexDirection: 'row',
    // alignContent: 'center',
    alignItems: 'baseline',
    width: '90%',
    marginTop: heightToDp(4),
  },
  // googleLoginButton: {
  //   marginTop: heightToDp(2),
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   width: '49%',
  //   height: heightToDp(4),
  //   backgroundColor: 'black',
  //   alignItems: 'center',
  //   borderRadius: scale(2),
  // },

  // googleIcon: {
  //   height: scale(5),
  //   width: scale(5),
  //   marginRight: widthToDp(2),
  // },
});

export default style;
