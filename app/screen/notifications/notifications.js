import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {HeaderComponent} from '../../component';
import style from './style';
import {
  iconPath,
  imagePath,
  navigationStrings,
  notificationTypes,
} from '../../constants';
import moment from 'moment';
import {NotificationList} from '../../component';
import {useSelector, useDispatch} from 'react-redux';
import {readAllNotification} from '../../store';
import {globalStyles} from '../../themes';
import {heightToDp, scale} from '../../utils';
import {Appbar} from 'react-native-paper';

const Notifications = () => {
  const {notifications} = useSelector(state => state.notification);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllNotification());
  }, []);

  const onPressHandle = action => {
    // console.log(action);
    switch (action) {
      case notificationTypes.NEW_LOAD:
        navigation.navigate(navigationStrings.SEARCH_LOAD);
        break;
      case notificationTypes.KYC_UPDATE:
        navigation.navigate(navigationStrings.ACCOUNT);
        break;
      case notificationTypes.BID_ACCEPT:
        navigation.navigate(navigationStrings.TRIPS, {
          screen: navigationStrings.QUOTATIONS,
        });
        break;
      case notificationTypes.TRIP_STATUS:
        navigation.navigate(navigationStrings.TRIPS, {
          screen: navigationStrings.CONFIRMED,
        });
        break;
      case notificationTypes.TRIP_CLOSED:
        navigation.navigate(navigationStrings.TRIPS, {
          screen: navigationStrings.COMPLETED,
        });
        break;
      case notificationTypes.VEHICLE_UPDATE:
        navigation.navigate(navigationStrings.VEHICLES);
        break;
      case notificationTypes.DRIVER_UPDATE:
        navigation.navigate(navigationStrings.DRIVERS);
        break;

      default:
        navigation.navigate(navigationStrings.NOTIFICATION_SCREEN);
        break;
    }
  };

  const renderList = ({item, index}) => (
    <>
      <TouchableOpacity
        onPress={() => {
          onPressHandle(item?.action);
        }}>
        <NotificationList
          key={index}
          title={item.title}
          description={item.body}
          ago={moment(item.time).fromNow()}
        />
      </TouchableOpacity>

      {/* to give some bottom margin to the last item list  */}
      {index == notifications?.length - 1 ? (
        <View style={{height: heightToDp(35)}}></View>
      ) : null}
    </>
  );

  // ------------------------------------------------------------------------------------
  return (
    <>
      {/* ---------------header -------------------------------------------------------- */}
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.NOTIFICATION_SCREEN}
      />

      {notifications?.length === 0 ? (
        <>
          <View style={globalStyles.container}>
            <View style={style.empty}>
              <Text
                style={[
                  globalStyles.largeText,
                  {
                    alignSelf: 'center',
                  },
                ]}>
                You don't have a notification
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <FlatList
            style={globalStyles.container}
            data={notifications}
            // style={{marginTop: heightToDp(1)}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderList}
          />
        </>
      )}
    </>
  );
};

export default Notifications;
