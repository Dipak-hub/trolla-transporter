import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import style from './style';
import {navigationStrings, colorStrings, constants} from '../../../constants';
import {scale} from '../../../utils/responsive/responsive';
// import {QuotesList, RatingStar, StatusIndicator} from '../..';
import {globalStyles} from '../../../themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment/moment';

const TripInquiryList = props => {
  const navigation = useNavigation();
  const {
    load_no,
    pickup,
    delivery,
    vehicle_type,
    material_type,
    weight,
    value,
    created_date,
    pickup_date,
    expected_delivery_date,
  } = props.load;

  const {user_name} = props.loader;

  const {amount, delivery_date, _id: quotation_id} = props.quotation;

  return (
    <View style={style.container}>
      {/* header section */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.LOAD_DETAILS, {
            booking_id: props?.trip_id,
            quotation_id,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
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
              // style={globalStyles.zero}
            />

            <Text style={globalStyles.mediumText}>
              {moment(created_date).format(constants.DATE_FORMATE)}
            </Text>
          </View>
          <View style={style.quoteCounter}>
            <Text>
              DD : {moment(delivery_date).format(constants.DATE_FORMATE)}
            </Text>
          </View>
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
        {/* footer bar ------------------------------------------ */}
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
              // style={globalStyles.zero}
            />
            <Text style={globalStyles.mediumText}>
              {' '}
              {material_type.length > 15
                ? material_type.slice(0, 15) + '...'
                : material_type}
            </Text>
          </View>

          <View style={globalStyles.flexRow}>
            <Icon
              name="currency-inr"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              // style={globalStyles.zero}
            />
            <Text style={globalStyles.mediumText}>{amount}</Text>
          </View>

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
    </View>
  );
};
export default TripInquiryList;
