import React, {useState, useEffect, useRef, useCallback} from 'react';

import {
  Alert,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
  AppState,
  FlatList,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';
import {Button, Headline, Subheading, List, Text} from 'react-native-paper';
import style from './style';
import {
  imagePath,
  colorStrings,
  navigationStrings,
  statusTypes,
  notificationTypes,
} from '../../../constants';
import {
  HeaderComponent,
  CustomCardButton,
  ConfirmedTripsHomeList,
} from '../../../component';
import {
  heightToDp,
  scale,
  fcmService,
  socket,
  widthToDp,
  clearAsyncStorage,
} from '../../../utils';
import {
  authStateClear,
  clearLoad,
  clearNotification,
  clearTrips,
  driverStateClear,
  fmcSet,
  getConfirmedTrips,
  getDriverCount,
  logout,
  self,
  setNotification,
  userStateClear,
} from '../../../store';
import {globalStyles, size} from '../../../themes';
import {
  getVehicleCount,
  vehicleStateClear,
} from '../../../store/slice/vehicle-slice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const Heading = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user_name, _id} = useSelector(state => state.user.user);

  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    dispatch(self());
    fcmService.register(onRegister, onNotification, onOpenNotification);
  }, []);

  const onRegister = token => {};

  const onNotification = (notify, data) => {
    dispatch(setNotification({notify, data}));

    const options = {
      soundName: 'default',
      playSound: true,
    };
    // localNotificationService.showNotification(
    //   0,
    //   notify.title,
    //   notify.body,
    //   notify,
    //   options,
    // );
  };

  // const onOpenNotification = async (notify, data) => {
  //   navigation.navigate(navigationStrings.NOTIFICATION_SCREEN);
  // };
  const onOpenNotification = async (notify, data) => {
    const {action} = data;
    switch (action) {
      case notificationTypes.NEW_LOAD:
        navigation.navigate(navigationStrings.SEARCH_LOAD);
        break;
      case notificationTypes.KYC_UPDATE:
        navigation.navigate(navigationStrings.ACCOUNT);
        break;
      case notificationTypes.BID_ACCEPT:
        navigation.navigate(navigationStrings.TRIPS, {
          screen: navigationStrings.CONFIRMED,
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

  useEffect(async () => {
    const res = AuthVerify();
    if (
      res === 'expired' ||
      (await AsyncStorage.getItem('refreshToken')) === 'expired'
    ) {
      logOut();
    }
  }, [
    async () => {
      await AsyncStorage.getItem('refreshToken');
    },
  ]);

  const logOut = () => {
    dispatch(authStateClear());
    dispatch(driverStateClear());
    dispatch(userStateClear());
    dispatch(clearTrips()),
      dispatch(clearLoad()),
      dispatch(vehicleStateClear()),
      dispatch(clearNotification());
    navigation.replace(navigationStrings.LOGIN);
    clearAsyncStorage();
    // BackHandler.exitApp();
  };

  return (
    <View
      style={[
        globalStyles.mb_4,
        {flexDirection: 'row', justifyContent: 'space-around'},
      ]}>
      <View style={{width: '50%', paddingLeft: '7%'}}>
        <Headline style={style.headlineUserName}>Hello ,</Headline>
        <Headline
          style={[style.headlineUserName, {marginTop: 0}]}
          numberOfLines={1}>
          {user_name}
        </Headline>
      </View>
      <ImageBackground
        source={imagePath.DASHBOARD_IMAGE}
        style={style.topSectionBackgroundImage}
        resizeMode="cover"
        imageStyle={{opacity: 0.5}}
      />
    </View>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const isVerified = useSelector(state => state.user.isVerified);
  const {driver_count} = useSelector(state => state.driver);
  const {vehicle_count} = useSelector(state => state.vehicle);

  const {confirmed_trips, is_loading, data, error} = useSelector(
    state => state.trips.confirmed_trips,
  );
  // const [textFrom, setTextFrom] = useState('');
  const navigation = useNavigation();
  let loadFirstTime = useRef(0);
  const appState = useRef(AppState.currentState);
  const shouldHandleBackground = useRef(true);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
    // navigation.setOptions({tabBarStyle: {display: 'none'}});
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(getVehicleCount());
  //     dispatch(getDriverCount());
  //     dispatch(getConfirmedTrips());

  //     loadFirstTime.current = loadFirstTime.current + 1;
  //   }, [loadFirstTime]),
  // );

  // useEffect(() => {
  //   const appStateListener = AppState.addEventListener(
  //     'change',
  //     nextAppState => {
  //       if (
  //         appState.current.match(/inactive|background/) &&
  //         nextAppState === 'active' &&
  //         shouldHandleBackground.current == true &&
  //         navigation.isFocused()
  //       ) {
  //         shouldHandleBackground.current = false;
  //         // console.log(nextAppState)
  //         dispatch(getVehicleCount());
  //         dispatch(getDriverCount());
  //         dispatch(getConfirmedTrips());
  //         shouldHandleBackground.current = true;
  //       }
  //       appState.current = nextAppState;
  //     },
  //   );
  //   return () => {
  //     appStateListener?.remove();
  //   };
  // }, []);

  let onGoingTrips = [];

  useEffect(async () => {
    dispatch(getVehicleCount());
    dispatch(getDriverCount());
    dispatch(getConfirmedTrips());
  }, []);

  onGoingTrips = data?.trips?.filter(
    item => item.status !== statusTypes.CONFIRMED,
  );

  const onRefresh = async () => {
    dispatch(getConfirmedTrips());
  };

  const renderConfirmedTripsListHandler = () => {
    let list = [];
    for (let index = 0; index < onGoingTrips?.length; index++) {
      if (index >= 5) {
        list.push(
          <Button
            key={index.toString()}
            style={{marginTop: heightToDp(2), marginBottom: heightToDp(4)}}
            onPress={() =>
              navigation.navigate(navigationStrings.TRIPS, {
                screen: navigationStrings.CONFIRMED,
              })
            }>
            View all ongoing trips
          </Button>,
        );
        break;
      }
      list.push(renderConfirmedTripsList(onGoingTrips[index], index));
    }
    return list;
  };
  const renderConfirmedTripsList = (item, index) => (
    <View key={index.toString()}>
      <ConfirmedTripsHomeList trip={item} />
      {/* to give some bottom margin to the last item of list  */}
      {index == onGoingTrips?.length - 1 ? (
        <View style={{height: heightToDp(20)}}></View>
      ) : null}
    </View>
  );

  return (
    <>
      {/* -----------header navigation---------------------- */}
      <></>
      <HeaderComponent
        hasDrawerButton={true}
        openDrawer={openDrawer}
        title={navigationStrings.DASHBOARD}
      />
      <ScrollView style={style.container}>
        <View
          style={[
            style.topSection,
            {
              // backgroundColor: 'green',
              transform: [{rotate: '0deg'}],
            },
          ]}>
          <Heading />
          {/* -------------search box-------------------------- */}
          <View style={style.searchLoadBoxWrapper}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SEARCH_LOAD, {
                  pickup_search_box_focus: true,
                })
              }>
              <View style={style.searchLoadBox}>
                <View style={style.greenCircle}></View>
                <Subheading style={globalStyles.ml_4}>
                  Enter Loading Point
                </Subheading>
              </View>
            </TouchableOpacity>
            <View style={style.grayLine}></View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SEARCH_LOAD, {
                  delivery_search_box_focus: true,
                })
              }>
              <View style={style.searchLoadBox}>
                <View style={style.redCircle}></View>
                <Subheading style={globalStyles.ml_4}>
                  Enter Unloading Point
                </Subheading>
              </View>
            </TouchableOpacity>
          </View>
          {/* ------------- truck and driver card -------------------------- */}

          <View style={[globalStyles.flex_JA_center, globalStyles.mt_2]}>
            <TouchableOpacity
              style={style.leftCard}
              onPress={() =>
                navigation.navigate(navigationStrings.DRIVERS, {pick: false})
              }>
              <View style={globalStyles.flexRow}>
                <Text style={{}}>Drivers</Text>
                <Icon
                  name="folder-plus-outline"
                  color={colorStrings.BLACK_PRIMARY}
                  size={scale(5)}
                  style={globalStyles.ml_2}
                />
              </View>

              <Headline style={{alignSelf: 'flex-end'}}>
                {driver_count?.total || 0}
              </Headline>
            </TouchableOpacity>

            <TouchableOpacity
              style={style.rightCard}
              onPress={() =>
                navigation.navigate(navigationStrings.VEHICLES, {pick: false})
              }>
              <View style={globalStyles.flexRow}>
                <Text style={{}}>Trucks</Text>
                <Icon
                  name="folder-plus-outline"
                  color={colorStrings.BLACK_PRIMARY}
                  size={scale(5)}
                  style={globalStyles.ml_2}
                />
              </View>
              <Headline style={{alignSelf: 'flex-end'}}>
                {vehicle_count?.total || 0}
              </Headline>
            </TouchableOpacity>
          </View>
        </View>

        {/* firs time complete kyc button ------------------------------------------*/}
        {isVerified ? (
          <>
            <View
              style={{
                paddingHorizontal: widthToDp(4),
                marginTop: heightToDp(2),
              }}>
              {onGoingTrips?.length !== 0 ? (
                renderConfirmedTripsListHandler()
              ) : (
                <Text
                  style={[
                    globalStyles.largeText,
                    {
                      alignSelf: 'center',
                      marginTop: heightToDp(15),
                    },
                  ]}>
                  You don't have any trips running.
                </Text>
              )}
            </View>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.ACCOUNT)}>
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                fontSize: size.LARGE,
                marginBottom: heightToDp(6),
                marginTop: heightToDp(10),
              }}>
              You have to complete your KYC first
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

const AuthVerify = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  // console.log('refreshToken', refreshToken);

  if (refreshToken && refreshToken !== 'expired') {
    const decodedJwt = jwt_decode(refreshToken);
    // console.log('decodedJwt', decodedJwt);
    if (decodedJwt.exp * 1000 < Date.now()) {
      // console.log('refreshToken expired');
      return 'expired';
    } else {
      return true;
    }
  }
};

export default Dashboard;
