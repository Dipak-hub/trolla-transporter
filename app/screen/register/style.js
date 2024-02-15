import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants/index';
import {scale, widthToDp, heightToDp} from '../../utils';

const style = StyleSheet.create({
  container: {
    paddingTop: 0,
    // alignItems: 'center',
    flex: 1,
  },
  registerContainer: {
    // paddingHorizontal: widthToDp(5),
    paddingVertical: heightToDp(5),
    alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1,
  },
  textInput: {
    fontSize: scale(3.8),
    backgroundColor: colorStrings.WHITE_PRIMARY,
    width: widthToDp(80),
    marginTop: heightToDp(2),
  },
  image: {
    height: heightToDp(30),
    // width: 'auto',
    marginTop: heightToDp(5),
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  submitButton: {
    marginHorizontal: widthToDp(10),
    backgroundColor: colorStrings.COLOR_PRIMARY,
    width: widthToDp(30),
    height: heightToDp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  skipButton: {
    marginHorizontal: widthToDp(10),
    backgroundColor: colorStrings.COLOR_PRIMARY_YELLOW,
    width: widthToDp(30),
    height: heightToDp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default style;
