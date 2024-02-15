import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {size, fonts} from '../../themes';
import {scale, widthToDp, heightToDp} from '../../utils';
const style = StyleSheet.create({
  container: {
    backgroundColor: colorStrings.SNOW_WHITE,
    flex: 1,
    paddingHorizontal: widthToDp(1.5),
    paddingBottom: heightToDp(6),
  },
  cardSection: {
    marginTop: heightToDp(1.5),
    borderRadius: scale(2),
    backgroundColor: 'white',
    paddingHorizontal: widthToDp(0.2),
    paddingVertical: heightToDp(0.2),
  },

  deleteButton: {
    marginTop: heightToDp(1.5),
    // marginBottom: heightToDp(10),
  },
  tripDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(2),
    backgroundColor: colorStrings.DARK_GRAY,
    borderTopLeftRadius: scale(2),
    borderTopRightRadius: scale(2),
  },
  tripDetailsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp(2),
    paddingVertical: heightToDp(1),
    alignItems: 'center',
    borderBottomColor: colorStrings.DARK_GRAY_2,
    borderBottomWidth: 1,
  },

  mapContainer: {
    marginTop: heightToDp(1),
    borderWidth: 1,
    borderColor: colorStrings.TOMATO,
  },
  textInput: {
    height: heightToDp(8),
    fontSize: scale(4),
    backgroundColor: colorStrings.GAINSBORO,
  },
  quoteSection: {
    marginTop: heightToDp(2),
    backgroundColor: colorStrings.GAINSBORO,
    paddingVertical: heightToDp(3),
    borderRadius: 5,
  },
  selectDateButton: {
    // padding: 0,
    // margin: 0,
    borderWidth: 1,
    borderColor: colorStrings.DARK_GRAY,
    height: '100%',
    width: widthToDp(40),
    paddingLeft: widthToDp(1),
    borderRadius: scale(1),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textLink: {
    alignSelf: 'baseline',
    textAlign: 'justify',
    letterSpacing: 0.7,
    color: colorStrings.TOMATO,
    textDecorationLine: 'underline',
  },
  cantBidErrorContainer:{
    backgroundColor:'#f8d7da',
    paddingLeft:6,
    paddingRight:6,
    paddingBottom:15,
    paddingTop:10,
    marginTop:10,
    borderRadius:5,
  },
  cantBidError:{
    alignSelf: 'baseline',
    textAlign: 'justify',
    letterSpacing: 0.2,
    color: '#721c24',
    marginTop:heightToDp(1),
    fontSize:scale(4),
    marginLeft:widthToDp(3),
    lineHeight:20
  }
});

export default style;
