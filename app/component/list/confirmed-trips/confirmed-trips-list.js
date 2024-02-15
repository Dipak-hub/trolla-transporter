import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {List, Text} from 'react-native-paper';
import style from './style';
import {useNavigation} from '@react-navigation/core';
import {
  navigationStrings,
  status,
  colorStrings,
  constants,
} from '../../../constants';
import {scale} from '../../../utils/responsive/responsive';
import {StatusIndicator} from '../..';
import {heightToDp} from '../../../utils';
import {globalStyles} from '../../../themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const ConfirmedTripsList = props => {
  let {load_no, pickup, delivery, vehicle_type, material_type, weight, value} =
    props.trip.load;
  const {delivery_date, amount} = props.trip.quotation;
  const {user_name} = props.trip.loader;
  const {_id, status} = props.trip;
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(navigationStrings.CONFIRMED_TRIPS_DETAILS, _id)
        }>
        {/* header section */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View style={style.header}>
            <Text style={globalStyles.mediumText}>Load No : {load_no}</Text>
          </View>

          <View style={globalStyles.flexRow}>
            <Icon
              name="calendar-month-outline"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />
            <Text style={globalStyles.bigText}>
              {moment(delivery_date).format(constants.DATE_FORMATE)}
            </Text>
          </View>
          <StatusIndicator
            status={status}
            styles={[
              globalStyles.ml_2,
              globalStyles.mr_3,
              {
                marginTop: heightToDp(-4),
              },
            ]}
          />
        </View>

        {/* end header section */}

        {/* middle section */}
        <View style={style.middle}>
          <View
            style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={globalStyles.flexRow}>
              <Icon
                name="package-variant"
                color={colorStrings.BLACK_PRIMARY}
                size={scale(5)}
                style={globalStyles.mr_1}
              />
              <Text
                style={[globalStyles.mediumText, globalStyles.mr_2]}
                numberOfLines={1}>
                {user_name}
              </Text>
            </View>

            <View style={globalStyles.flexRow}>
              <Icon
                name="map-marker"
                color={colorStrings.BLACK_PRIMARY}
                size={scale(5)}
                style={[globalStyles.mt_1, globalStyles.mr_1]}
              />
              <Text
                style={[globalStyles.mediumText, globalStyles.mr_2]}
                numberOfLines={1}>
                {pickup?.address}
              </Text>
            </View>

            <View style={globalStyles.flexRow}>
              <Icon
                name="map-marker-multiple"
                color={colorStrings.BLACK_PRIMARY}
                size={scale(5)}
                style={[globalStyles.mt_1, globalStyles.mr_1]}
              />
              <Text
                style={[globalStyles.mediumText, globalStyles.mr_2]}
                numberOfLines={1}>
                {delivery?.address}
              </Text>
            </View>
          </View>
        </View>

        {/* bottom section ------------------------------------------------------------------------------- */}

        <View
          style={[
            style.header,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <View style={globalStyles.flexRow}>
            <Icon
              name="dropbox"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />

            <Text style={globalStyles.mediumText}>
              {material_type?.length > 15
                ? material_type?.slice(0, 15) + '...'
                : material_type}
            </Text>
          </View>

          <View style={globalStyles.flexRow}>
            <Icon
              name="currency-inr"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />

            <Text style={globalStyles.mediumText}>{amount}</Text>
          </View>
          {/* <View style={globalStyles.flexRow}>
            <IconButton
              icon="truck-outline"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />
            <Text style={globalStyles.mediumText}>{vehicle_type}</Text>
          </View> */}
          <View style={globalStyles.flexRow}>
            <Icon
              name="weight"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />

            <Text style={globalStyles.mediumText}>{weight} tons</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* end bottom section */}
    </View>
  );
};
export default ConfirmedTripsList;
