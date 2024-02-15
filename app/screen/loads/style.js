import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {heightToDp, widthToDp, scale} from '../../utils';
const style = StyleSheet.create({
  button: {
    width: '97%',
  },
  searchLoadBoxWrapper: {
    borderRadius: scale(2),
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: colorStrings.WHITE_PRIMARY,
    marginBottom: heightToDp(2),
  },
  searchLoadBox: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthToDp(6),
    // paddingVertical: heightToDp(1.5),
  },
  greenCircle: {
    height: heightToDp(2),
    width: widthToDp(3.7),
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 14 / 2,
    marginTop:heightToDp(1.5)
  },

  grayLine: {
    height: heightToDp(0.1),
    width: '100%',
    backgroundColor: 'gray',
  },
  redCircle: {
    height: heightToDp(2),
    width: widthToDp(3.7),
    borderWidth: 1,
    borderColor: 'red',
    marginTop: heightToDp(1.5),
    // marginLeft: widthToDp(4.3),
    borderRadius: 14 / 2,
  },
  textInput: {
    flex: 1,
    color: '#000000',
    // backgroundColor: 'red',
    height: heightToDp(5.3),
    marginLeft: widthToDp(2),
  },
  searchLoadButton: {
    paddingHorizontal: scale(2),
    paddingVertical: scale(1),
    backgroundColor: colorStrings.TOMATO,
    borderRadius: 5,
    textAlign: 'center',
    color: 'white',
    width: widthToDp(30),
    marginVertical: heightToDp(1),
  },
});

export default style;
