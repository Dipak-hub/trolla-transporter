import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {size, fonts} from '../../themes';
import {scale, widthToDp, heightToDp} from '../../utils';
const style = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp(2),
    paddingVertical: heightToDp(1),
    marginTop: heightToDp(1),
    alignItems: 'center',
  },
  topHeaderRight: {
    flexDirection: 'row',
  },
  topHeaderRightStatus: {
    backgroundColor: 'green',
    color: colorStrings.WHITE_PRIMARY,
    fontSize: size.COMPACT,
    padding: scale(1.2),
    borderRadius: scale(5),
  },
  topHeaderRightText: {
    fontSize: size.COMPACT,
    fontFamily: fonts.CERA_MEDIUM,
    padding: scale(1.2),
  },
  payBalanceSec: {
    alignItems: 'center',
    // alignContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: heightToDp(2),
    justifyContent: 'center',
    marginTop: heightToDp(1.5),
    borderRadius: scale(2),
  },
  cardSection: {
    marginTop: heightToDp(1.5),
    borderRadius: scale(2),
    backgroundColor: colorStrings.WHITE_PRIMARY,
    paddingHorizontal: widthToDp(0.2),
    paddingVertical: heightToDp(0.2),
  },
  accordionSize: {
    backgroundColor: colorStrings.WHITE_PRIMARY,
    paddingLeft: 0,
    borderRadius: scale(2),
    paddingBottom: 0,
    paddingTop: 0,
  },
  payBalanceButton: {
    marginTop: heightToDp(1.5),
  },
  tripDetails: {
    marginTop: heightToDp(1),
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
  map: {
    height: heightToDp(35),
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // compactText: {
  //   fontSize: size.COMPACT,
  // },
  // cardHeader: {
  //   fontSize: size.LARGE,
  // },
  documentImage: {
    height: heightToDp(13),
  },
  document_not_uploader_message: {
    color: colorStrings.GRAPH_FRUITS,
    marginLeft: widthToDp(4),
  },
});

export default style;
