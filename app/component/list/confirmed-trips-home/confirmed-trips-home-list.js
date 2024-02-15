import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {List, Text} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import style from './style';
import moment from 'moment';
import {useNavigation} from '@react-navigation/core';
import {
  navigationStrings,
  status,
  colorStrings,
  animationStrings,
} from '../../../constants';
import {scale} from '../../../utils/responsive/responsive';
import {StatusIndicator} from '../..';
import {coordinateToAddress, heightToDp, widthToDp} from '../../../utils';
import {globalStyles} from '../../../themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConfirmedTripsHomeList = ({trip}) => {
  const navigation = useNavigation();
  const [lastLocation, setLastLocation] = useState('');
  const getLocation = async ({latitude, longitude}) => {
    if (latitude && longitude) {
      const lastLocation = await coordinateToAddress(latitude, longitude);
      setLastLocation(lastLocation);
    }
  };
  useEffect(() => {
    if (trip?.vehicle?.gps) {
      getLocation(trip?.vehicle?.gps);
    }
  }, []);

  let lastLocationTimeDateTime = moment
    .utc(trip?.vehicle?.updatedAt)
    .local()
    .format('Do MMM hh:mm a');

  let lastLocationDate = moment
    .utc(trip?.vehicle?.updatedAt)
    .local()
    .format('D MMM');
  let lastLocationTime = moment
    .utc(trip?.vehicle?.updatedAt)
    .local()
    .format('hh:mm a  ');

  const today = moment().format('D MMM');
  let locationTime = '';

  locationTime =
    lastLocationDate === today
      ? `Today at ${lastLocationTime}`
      : lastLocationTimeDateTime;

  // console.log(lastLocation);

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            navigationStrings.CONFIRMED_TRIPS_DETAILS,
            trip?._id,
          )
        }>
        {/* header section */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={[
              style.header,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // height: heightToDp(10),
              },
            ]}>
            {Boolean(lastLocation) && (
              <LottieView
                source={animationStrings.LOCATION}
                autoPlay={true}
                loop={true}
                duration={3000}
                style={{
                  height: heightToDp(8),
                  width: widthToDp(8),
                  padding: -5,
                  marginTop: heightToDp(-2.3),
                  alignSelf: 'center',
                  // backgroundColor: 'red',
                }}
              />
            )}

            {Boolean(lastLocation) ? (
              <Text style={[style.statusIndicator]}>Live Location</Text>
            ) : (
              <Text
                style={[
                  style.statusIndicator,
                  {backgroundColor: colorStrings.BLACK_PRIMARY},
                ]}>
                Trip not Started
              </Text>
            )}

            {/* <View style={style.header}>
              <Text style={globalStyles.mediumText}>AS01 BX 1212</Text>
            </View> */}
          </View>

          {/* <View style={globalStyles.flexRow}>
            <Icon
              name="calendar-month-outline"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />
            <Text style={globalStyles.bigText}>55555</Text>
          </View> */}
          <StatusIndicator
            status={trip?.status}
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
                name="truck-outline"
                color={colorStrings.BLACK_PRIMARY}
                size={scale(5)}
                style={globalStyles.mr_1}
              />
              {/* <Text style={globalStyles.mediumText} numberOfLines={1}>
                Today 09:59 am
              </Text> */}
              <Text style={globalStyles.largeText}>
                {trip?.vehicle?.rc_number}
                {'  '}
              </Text>
              <Text style={globalStyles.mediumText}>
                {trip?.driver?.user_name}
              </Text>
            </View>

            <View style={globalStyles.flexRow}>
              <Icon
                name="map-marker"
                color={colorStrings.BLACK_PRIMARY}
                size={scale(5)}
                style={[globalStyles.mt_1, globalStyles.mr_1]}
              />
              <Text style={globalStyles.mediumText} numberOfLines={1}>
                {lastLocation ||
                  'Location will be available once trip is started'}
                {/* Lalungaon, NPS Road, AHOM GAON, Guwahati, Assam, India */}
              </Text>
            </View>

            {/* <View style={globalStyles.flexRow}>
              <Icon
                name="human-child"
                color={colorStrings.BLACK_PRIMARY}
                size={scale(5)}
                style={[globalStyles.mt_1, globalStyles.mr_1]}
              />
              <Text style={globalStyles.mediumText} numberOfLines={1}>
                Manjit Singh
              </Text>
            </View> */}
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
              name="clock-time-eight-outline"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />
            {Boolean(lastLocation) ? (
              <Text style={globalStyles.mediumText}> {locationTime}</Text>
            ) : (
              <Text style={globalStyles.mediumText}> Waiting for location</Text>
            )}
          </View>

          <View style={globalStyles.flexRow}>
            <Icon
              name="package-variant"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={[globalStyles.zero, globalStyles.mr_1]}
            />

            <Text style={globalStyles.mediumText}>
              Load No : {trip?.load?.load_no}
            </Text>
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

          {/* <View style={globalStyles.flexRow}>
            <Icon
              name="weight"
              color={colorStrings.BLACK_PRIMARY}
              size={scale(5)}
              style={globalStyles.zero}
            />

            <Text style={globalStyles.mediumText}>weight tons</Text>
          </View> */}
        </View>
      </TouchableOpacity>

      {/* end bottom section */}
    </View>
  );
};
export default ConfirmedTripsHomeList;
