import {StyleSheet} from 'react-native';
import {heightToDp, scale, widthToDp} from '../utils';
import size from './size';
import fonts from './fonts';
import {colorStrings} from '../constants';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthToDp(2),
    backgroundColor: colorStrings.SNOW_WHITE,
    paddingTop: heightToDp(2),
  },

  largeText: {
    fontSize: size.LARGE,
    fontFamily: fonts.CERA_MEDIUM,
  },
  bigText: {
    fontSize: size.COMPACT,
    fontFamily: fonts.CERA_MEDIUM,
  },
  mediumText: {
    fontSize: size.MEDIUM,
    fontFamily: fonts.CERA_MEDIUM,
  },
  smallText: {
    fontSize: size.SMALL,
    fontFamily: fonts.CERA_MEDIUM,
  },
  // card ---------------------------------------------
  card: {
    marginTop: heightToDp(1),
    borderRadius: scale(2),
    paddingHorizontal: widthToDp(2),
    paddingVertical: heightToDp(1),
  },
  // flex----------------------------------------------
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowFromStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  justify: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flex_JA_center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // margin bottom --------------------------------------
  mb_1: {
    marginBottom: heightToDp(3),
  },
  mb_2: {
    marginBottom: heightToDp(2),
  },
  mb_3: {
    marginBottom: heightToDp(3),
  },
  mb_4: {
    marginBottom: heightToDp(4),
  },
  // margin top -------------------------------------------
  mt_1: {
    marginTop: heightToDp(1),
  },
  mt_2: {
    marginTop: heightToDp(2),
  },
  mt_3: {
    marginTop: heightToDp(3),
  },
  mt_4: {
    marginTop: heightToDp(4),
  },
  // margin left------------
  ml_1: {
    marginLeft: widthToDp(1),
  },
  ml_2: {
    marginLeft: widthToDp(2),
  },
  ml_3: {
    marginLeft: widthToDp(3),
  },
  ml_4: {
    marginLeft: widthToDp(4),
  },
  // margin right------------
  mr_1: {
    marginRight: widthToDp(1),
  },
  mr_2: {
    marginRight: widthToDp(2),
  },
  mr_3: {
    marginRight: widthToDp(3),
  },
  mr_4: {
    marginRight: widthToDp(4),
  },
  zero: {
    padding: 0,
    margin: 0,
  },
  max_width_25: {
    maxWidth: widthToDp(25),
  },
  pd_1: {
    padding: scale(1),
  },
  pd_2: {
    padding: scale(2),
  },
  pd_3: {
    padding: scale(3),
  },
  pd_4: {
    padding: scale(4),
  },
});

export default globalStyles;
