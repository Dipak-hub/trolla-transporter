import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {IconButton, List, Text, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import style from './style';
import {navigationStrings} from '../../../constants';
import {scale} from '../../../utils/responsive/responsive';
import {RatingStar, StatusIndicator} from '../..';
import {widthToDp, heightToDp} from '../../../utils';
import {globalStyles} from '../../../themes';

const QuotationList = props => {
  const navigation = useNavigation();
  const {transporterName, rating, cost, delivery_date} = props;

  return (
    <Card style={style.quotationContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigationStrings.ENQUIRY_TRIPS_DETAILS);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: widthToDp(4),
            paddingVertical: heightToDp(1),
          }}>
          <Text style={globalStyles.mediumText}>{transporterName}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              justifyContent: 'space-between',
              paddingHorizontal: widthToDp(4),
              paddingVertical: heightToDp(1),
            }}>
            <RatingStar rating={rating} size={scale(4)} />
            <Text style={globalStyles.mediumText}>Rating</Text>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              paddingHorizontal: widthToDp(4),
              paddingVertical: heightToDp(1),
            }}>
            <Text style={[globalStyles.mediumText]}>Rs.{cost}</Text>
            <Text style={globalStyles.mediumText}>Cost</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              paddingHorizontal: widthToDp(4),
              paddingVertical: heightToDp(1),
            }}>
            <Text style={[globalStyles.mediumText]}>{delivery_date}</Text>
            <Text style={globalStyles.mediumText}>Delivered By</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
export default QuotationList;
