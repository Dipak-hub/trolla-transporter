import React from 'react';
import {Headline, Avatar, Subheading, List} from 'react-native-paper';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Image, View, Text, BackHandler} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/native';
import {iconPath, navigationStrings} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {
  authStateClear,
  clearLoad,
  clearNotification,
  clearTrips,
  driverStateClear,
  loadStateClear,
  logout,
  userStateClear,
} from '../../store';
import {
  vehicleStateClear,
  vehicleStateClearall,
} from '../../store/slice/vehicle-slice';
import {clearAsyncStorage, getVersionCode, scale} from '../../utils';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user_name, profile_pic} = useSelector(state => state.user.user);

  const logOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
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
      });
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.headerContainer}>
        <View style={style.avatarImage}>
          <Avatar.Image
            size={60}
            source={profile_pic ? {uri: profile_pic} : iconPath.AVATAR}
          />
        </View>
        <View>
          <Headline style={style.headerName}>{user_name}</Headline>
          <Subheading style={style.headerType}>Partner</Subheading>
        </View>
      </View>

      <List.Item
        title="Add vehicle"
        style={style.listItem}
        titleStyle={{fontSize: scale(4.5)}}
        left={props => (
          <List.Icon
            {...props}
            icon={({focused, color, size}) => (
              <Image source={iconPath.TRUCK} style={style.itemIcon} />
            )}
          />
        )}
        onPress={() => {
          // navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate(navigationStrings.VEHICLES, {pick: false});
        }}
      />
      <List.Item
        title="Add driver"
        style={style.listItem}
        titleStyle={{fontSize: scale(4.5)}}
        left={props => (
          <List.Icon
            {...props}
            icon={({focused, color, size}) => (
              <Image source={iconPath.DRIVER} style={style.itemIcon} />
            )}
          />
        )}
        onPress={() => {
          // navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate(navigationStrings.DRIVERS, {pick: false});
        }}
      />
      <List.Item
        title={navigationStrings.TERMS_AND_CONDITIONS_SCREEN}
        style={style.listItem}
        titleStyle={{fontSize: scale(4.5)}}
        left={props => (
          <List.Icon
            {...props}
            icon={({focused, color, size}) => (
              <Image source={iconPath.ACCEPT} style={style.itemIcon} />
            )}
          />
        )}
        onPress={() => {
          // navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate(navigationStrings.TERMS_AND_CONDITIONS_SCREEN);
        }}
      />
      {/*<List.Item*/}
      {/*    title={navigationStrings.PRIVACY_POLICY}*/}
      {/*    style={style.listItem}*/}
      {/*    titleStyle={{fontSize: scale(4.5)}}*/}
      {/*    left={props => (*/}
      {/*        <List.Icon*/}
      {/*            {...props}*/}
      {/*            icon={({focused, color, size}) => (*/}
      {/*                <Image source={iconPath.ACCEPT} style={style.itemIcon} />*/}
      {/*            )}*/}
      {/*        />*/}
      {/*    )}*/}
      {/*    onPress={() => {*/}
      {/*        // navigation.dispatch(DrawerActions.closeDrawer());*/}
      {/*        navigation.navigate(navigationStrings.PRIVACY_POLICY);*/}
      {/*    }}*/}
      {/*/>*/}
      <List.Item
        title="Share this app"
        style={style.listItem}
        titleStyle={{fontSize: scale(4.5)}}
        left={props => (
          <List.Icon
            {...props}
            icon={({focused, color, size}) => (
              <Image source={iconPath.SHARE} style={style.itemIcon} />
            )}
          />
        )}
        onPress={() => {
          // navigation.dispatch(DrawerActions.closeDrawer());
          // onShare();
          navigation.navigate(navigationStrings.REFER_APP_SCREEN);
        }}
      />
      <List.Item
        title={navigationStrings.LOGOUT}
        style={style.listItem}
        titleStyle={{fontSize: scale(4.5)}}
        left={props => (
          <List.Icon
            {...props}
            icon={({focused, color, size}) => (
              <Image source={iconPath.LOG_OUT} style={style.itemIcon} />
            )}
          />
        )}
        onPress={() => {
          logOut();
        }}
      />

      <View style={style.footerContainer}>
        <Text style={{alignItems: 'center'}}>
          Version Code : {getVersionCode()}
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
