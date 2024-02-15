import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import style from './style';
import {useNavigation} from '@react-navigation/core';
import {
  navigationStrings,
  colorStrings,
  status,
  imagePath,
  iconPath,
} from '../../../constants';
import {StatusIndicator} from '../..';
import {widthToDp, heightToDp, scale} from '../../../utils';
import {globalStyles} from '../../../themes';
import {useSelector, useDispatch} from 'react-redux';
import {setDriver} from '../../../store';

const DriverList = ({driver, pick}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => {
        if (pick) {
          dispatch(setDriver(driver));
          navigation.goBack();
        } else {
          navigation.navigate(navigationStrings.DRIVER_DETAILS, driver);
        }
      }}>
      <View style={globalStyles.flexRowSpaceBetween}>
        <View style={{width: widthToDp(70)}}>
          <Text style={[globalStyles.largeText]}>{driver?.user_name}</Text>
          <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            Address : {driver?.address}
          </Text>
          <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            Mobile : {driver?.mobile_primary}
          </Text>

          <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            DL NO : {driver?.documents.dl_number}
          </Text>
          <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            Alternate Mobile : {driver?.mobile_secondary || 'NA'}
          </Text>
          {/* <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            Account NO : {driver?.documents?.account_number||'NA'}
          </Text>
          <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            Name in bank : {driver?.documents?.name_in_bank||'NA'}
          </Text>
          <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            IFSC  : {driver?.documents?.ifsc_code||'NA'}
          </Text> */}
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={style.status}>
            <Text>{driver?.status}</Text>
          </View>
          <Avatar.Image
            size={scale(15)}
            source={
              driver?.profile_pic
                ? {
                    uri: driver?.profile_pic,
                  }
                : imagePath.DOC_BACKGROUND
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default DriverList;
