import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {size, fonts} from '../../themes';
import {heightToDp, scale, widthToDp} from '../../utils';
const style = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp(2),
    paddingVertical: heightToDp(1),
    marginTop: heightToDp(1),
    alignItems: 'center',
    backgroundColor: colorStrings.COLOR_PRIMARY_YELLOW,
    borderRadius: scale(5),
  },
  topHeaderRight: {
    // flexDirection: 'row',
  },
  topHeaderRightStatus: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: size.COMPACT,
    padding: scale(1.2),
    borderRadius: scale(5),
  },
  topHeaderRightText: {
    fontSize: size.COMPACT,
    padding: scale(1.2),
    fontFamily: fonts.CERA_MEDIUM,
  },

  tripDetails: {
    flex: 1,
    flexDirection: 'row',
    marginTop: heightToDp(1.5),
    paddingVertical: heightToDp(1),
  },
  tripDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(2.4),
    backgroundColor: colorStrings.DARK_GRAY,
    borderTopLeftRadius: scale(1),
    borderTopRightRadius: scale(1),
  },
  tripDetailsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp(2),
    paddingVertical: heightToDp(0.5),
    alignItems: 'center',
    borderBottomColor: colorStrings.DARK_GRAY,
    borderBottomWidth: 1,
  },
  cardSection: {
    marginTop: heightToDp(1.5),
    borderRadius: scale(1.5),
    paddingHorizontal: widthToDp(2.5),
    paddingVertical: widthToDp(2),
  },

  pickup: {
    marginTop: heightToDp(1),
    borderRadius: scale(2),
    paddingHorizontal: widthToDp(2),
    paddingVertical: heightToDp(0.7),
  },
  mapContainer: {
    marginTop: heightToDp(1),
    borderWidth: 1,
    borderColor: colorStrings.TOMATO,
  },
  payBalanceSec: {
    alignItems: 'center',
    // alignContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: heightToDp(2),
    justifyContent: 'center',
    marginTop: heightToDp(2),
    borderRadius: scale(2),
  },
  changeDriverVehicleButton: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorStrings.COLOR_PRIMARY_BLUE,
    borderRadius: scale(2),
    paddingHorizontal: widthToDp(2),
    paddingVertical: heightToDp(0.5),
    width: 'auto',
    marginHorizontal: widthToDp(2),
    alignSelf: 'flex-end',
  },
  driverAndVehicleDetailsImage: {
    height: heightToDp(4),
    width: widthToDp(8),
    marginTop: heightToDp(1),
    marginLeft: widthToDp(2),
  },
  selectDriverVehicleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorStrings.TOMATO,
    borderRadius: scale(4),
    paddingHorizontal: widthToDp(0.5),
    paddingVertical: heightToDp(0.5),
    width: widthToDp(45),
    // marginHorizontal: widthToDp(2),
  },
  changeDriverVehicleButtonImage: {
    height: heightToDp(2),
    width: widthToDp(4),
    marginTop: heightToDp(1),
    marginLeft: widthToDp(2),
    tintColor: colorStrings.WHITE_PRIMARY,
  },
  selectDriverVehicleButtonImage: {
    height: heightToDp(4),
    width: widthToDp(8),
    marginTop: heightToDp(1),
    marginLeft: widthToDp(2),
    tintColor: colorStrings.WHITE_PRIMARY,
  },
  accordionSize: {
    backgroundColor: colorStrings.WHITE_PRIMARY,
    paddingLeft: 0,
    borderRadius: scale(2),
    paddingBottom: 0,
    paddingTop: 0,
  },
  documentImage: {
    height: heightToDp(13),
  },
  document_not_uploader_message: {
    color: colorStrings.GRAPH_FRUITS,
    marginLeft: widthToDp(4),
  },
});

export default style;
