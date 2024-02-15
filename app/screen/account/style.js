import {StyleSheet} from 'react-native';
import {heightToDp, scale, widthToDp} from '../../utils';
import {size} from '../../themes';
import {colorStrings} from '../../constants';

const style = StyleSheet.create({
  container: {
    marginBottom: heightToDp(2),
    padding: heightToDp(1),
    paddingBottom: heightToDp(2),
    backgroundColor: colorStrings.WHITE_PRIMARY,
    borderColor: colorStrings.DARK_GRAY_2,
    borderWidth: 1,
    borderRadius: 3,
  },
  accountSection: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: heightToDp(1),
    backgroundColor: colorStrings.LIGHT_PINK,
    paddingVertical: heightToDp(2),
    marginVertical: heightToDp(1),
    borderRadius: 10,
  },
  profileIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: widthToDp(4),
    flexDirection: 'row',
  },
  statusIndicator: {
    width: widthToDp(25),
    marginTop: heightToDp(2),
    marginLeft: widthToDp(4),
    alignItems: 'center',
  },
  textInput: {
    marginBottom: heightToDp(1.5),
    // height: heightToDp(5.5),
    fontSize: size.MEDIUM,
    // marginHorizontal: widthToDp(2),
  },
  documentImage: {
    height: heightToDp(13),
  },
  bottomText: {
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: 'bold',
  },

  cardSection: {
    paddingHorizontal: 0,
    paddingBottom: 0,
    marginTop: heightToDp(1.5),
    backgroundColor: colorStrings.WHITE_PRIMARY,
    elevation: 0,
  },
  cardProfile: {},
  detailsHeading: {
    color: colorStrings.TOMATO,
    marginLeft: widthToDp(5),
    marginTop: heightToDp(1),
    textDecorationLine: 'underline',
    fontSize: scale(3),
  },
  AddressDetails: {
    marginLeft: widthToDp(5),
    marginTop: heightToDp(1),
    fontSize: scale(3.5),
  },
  details: {
    marginLeft: widthToDp(5),
    marginTop: heightToDp(1),
    fontSize: scale(3.5),
  },
  detailsContainer: {
    // flexDirection: 'row',
    // backgroundColor: colorStrings.WHITE_SMOKE,
    justifyContent: 'space-between',
    padding: scale(2),
  },
  // accordSize: {
  //   backgroundColor: 'white',
  //   paddingLeft: 0,
  //   borderRadius: scale(2),
  //   paddingBottom: 0,
  //   paddingTop: 0,
  // },

  chip: {
    marginHorizontal: scale(3),
    marginVertical: scale(1),
    padding: widthToDp(3.5),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  bottomSection: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    left: -10,
    marginTop: heightToDp(0.6),
    // width: '90%',
    // marginTop: heightToDp(4),
  },
  dropdown: {
    height: 50,
    marginTop: 16,
    marginBottom: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: colorStrings.WHITE_PRIMARY,
  },

  //new design css

  profilePictureContainer: {
    width: widthToDp(100),
    height: heightToDp(25),
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 3,
    right: 0,
    borderRadius: 50,
    height: heightToDp(3),
    width: widthToDp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headlineTextContainer: {
    padding: widthToDp(6),
  },
  headlineText: {
    fontSize: 18,
  },
  textInputNew: {
    borderTopWidth: 1,
    color: '#808080',
    padding: widthToDp(5),
  },
  addressProofText: {
    padding: widthToDp(5),
  },
});

export default style;
