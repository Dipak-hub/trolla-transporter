import {StyleSheet} from 'react-native';
import {colorStrings} from '../../constants';
import {scale, widthToDp, heightToDp} from '../../utils';

const style = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightToDp(3),
    marginBottom: heightToDp(1),
    // backgroundColor: colorStrings.colorPrimary,
    borderRadius: scale(10),
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2),
    paddingBottom: heightToDp(2),
    borderBottomColor: colorStrings.GAINSBORO,
    borderBottomWidth: 2,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: heightToDp(2),
    marginBottom: heightToDp(1),
    // backgroundColor: colorStrings.colorPrimary,
    borderRadius: scale(10),
    paddingHorizontal: widthToDp(6),
    paddingTop: heightToDp(2),
    paddingBottom: heightToDp(2),
    borderBottomColor: colorStrings.GAINSBORO,
    borderBottomWidth: 2,
  },

  avatarImage: {
    marginLeft: widthToDp(0),
    marginRight: widthToDp(4),
  },
  itemIcon: {
    width: scale(8),
    height: scale(8),
  },
  linearGradient: {
    borderRadius: 15,
  },
  headerName: {
    maxWidth: widthToDp(50),
  },
  listItem: {
    paddingHorizontal: widthToDp(4),
  },
});

export default style;
