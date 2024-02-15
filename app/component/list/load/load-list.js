import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import style from './style';
import {useNavigation} from '@react-navigation/core';
import {
  navigationStrings,
  colorStrings,
  status,
  constants,
} from '../../../constants';
import {StatusIndicator} from '../..';
import {widthToDp, heightToDp, scale} from '../../../utils';
import {globalStyles} from '../../../themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const LoadList = ({load}) => {
  const navigation = useNavigation();
  const {
    pickup,
    delivery,
    pickup_date,
    expected_delivery_date,
    load_no,
    created_date,
    material_type,
    weight,
    vehicle_type,
    value,
  } = load;
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(navigationStrings.LOAD_DETAILS, {load})
        }>
        {/* header section */}
        <Card elevation={0}>
          <View style={style.header}>
            <Text style={[globalStyles.mediumText, globalStyles.ml_1]}>
              Load No : <Text style={globalStyles.bigText}>{load_no}</Text>
            </Text>

            <Text style={[globalStyles.mediumText, globalStyles.ml_1]}>
              Created Date :{' '}
              {moment(created_date).format(constants.DATE_FORMATE)}
            </Text>
          </View>

          {/* end header section */}

          {/* middle section */}
          <View style={[style.middle]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={globalStyles.flexRow}>
                <Icon
                  name="truck-delivery"
                  color={colorStrings.BLACK_PRIMARY}
                  size={scale(5)}
                  style={globalStyles.mr_1}
                />
                <Text style={globalStyles.mediumText} numberOfLines={1}>
                  {moment(pickup_date).format(constants.DATE_FORMATE)} (pickup)
                </Text>
              </View>
              <View style={globalStyles.flexRow}>
                <Icon
                  name="truck-check"
                  color={colorStrings.BLACK_PRIMARY}
                  style={globalStyles.mr_1}
                  size={scale(5)}
                />
                <Text style={globalStyles.mediumText} numberOfLines={1}>
                  {moment(expected_delivery_date).format(
                    constants.DATE_FORMATE,
                  )}{' '}
                  (EDD)
                </Text>
              </View>
            </View>

            <View style={globalStyles.flexRow}>
              <Icon
                name="map-marker"
                color={colorStrings.BLACK_PRIMARY}
                style={globalStyles.pd_1}
                size={scale(5)}
              />
              <Text
                style={[globalStyles.mediumText, globalStyles.mr_1]}
                numberOfLines={1}>
                {pickup?.address}
              </Text>
            </View>

            <View style={globalStyles.flexRow}>
              <Icon
                name="map-marker-multiple"
                color={colorStrings.BLACK_PRIMARY}
                style={globalStyles.pd_1}
                size={scale(5)}
              />
              <Text
                style={[globalStyles.mediumText, globalStyles.mr_1]}
                numberOfLines={1}>
                {delivery?.address}
              </Text>
            </View>
          </View>
        </Card>

        {/* bottom section ------------------------------------------------------------------------------- */}

        <View
          style={[
            style.footer,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <View style={[globalStyles.justify]}>
            <Icon
              name="dropbox"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />
            <Text numberOfLines={1} style={globalStyles.smallText}>
              {material_type.length > 15
                ? material_type.slice(0, 15) + '...'
                : material_type}
            </Text>
          </View>

          <View style={[globalStyles.justify]}>
            <Icon
              name="currency-inr"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />

            <Text style={globalStyles.smallText}>{value}</Text>
          </View>

          <View style={[globalStyles.justify]}>
            <Icon
              name="truck-outline"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />
            <Text style={globalStyles.smallText}>{vehicle_type}</Text>
          </View>
          <View style={[globalStyles.justify]}>
            <Icon
              name="weight"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
            />

            <Text style={globalStyles.smallText}>{weight} MT</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default LoadList;
