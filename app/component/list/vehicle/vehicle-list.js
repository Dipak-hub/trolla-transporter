import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import style from './style';
import {useNavigation} from '@react-navigation/core';
import {navigationStrings, imagePath} from '../../../constants';
import {scale} from '../../../utils';
import {globalStyles} from '../../../themes';
import {useSelector, useDispatch} from 'react-redux';
import {setVehicle} from '../../../store';

const VehicleList = ({vehicle, pick}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => {
        if (pick) {
          dispatch(setVehicle(vehicle));
          navigation.goBack();
        } else {
          navigation.navigate(navigationStrings.VEHICLE_DETAILS, vehicle);
        }
      }}>
      <View style={globalStyles.flexRowSpaceBetween}>
        <View>
          <Text style={[globalStyles.largeText]}>{vehicle.rc_number}</Text>
          <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            Reg. To : {vehicle.owner_name}
          </Text>
          <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            Vehicle type : {vehicle.vehicle_type}
          </Text>
          <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
            Body Type : {vehicle.body_type}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={style.status}>
            <Text>{vehicle.status}</Text>
          </View>
          <Avatar.Image
            size={scale(15)}
            source={
              vehicle?.vehicle_image
                ? {
                    uri: vehicle.vehicle_image,
                  }
                : imagePath.DOC_BACKGROUND
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default VehicleList;
