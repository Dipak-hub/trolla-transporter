import React from 'react';
import {Appbar, Menu, Badge, Text, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';

import {useRoute} from '@react-navigation/core';
import {navigationStrings, colorStrings} from '../../constants';
import {CommonActions} from '@react-navigation/native';
import style from './style';
import {TouchableOpacity, View} from 'react-native';
import {iconPath} from '../../constants';
import {scale} from '../../utils';
import {useSelector} from 'react-redux';

const HeaderComponent = ({
  hasBackButton,
  hasDrawerButton,
  openDrawer,
  title,
}) => {
  const navigation = useNavigation();
  const routes = useRoute();
  // let hasNotification = false;
  return (
    <View style={style.container}>
      {hasBackButton ? (
        <Appbar.BackAction
          color="white"
          onPress={() => {
            navigation.dispatch(CommonActions.goBack());
          }}
        />
      ) : null}
      {hasDrawerButton && (
        <Appbar.Action
          icon={iconPath.DRAWER}
          onPress={() => openDrawer()}
          color="white"
        />
      )}

      <Appbar.Content title={title} color="white" titleStyle={style.title} />
      {/* <Appbar.Action icon="magnify" /> */}
      {routes.name === navigationStrings.HOME && (
        <>
          <RenderHelpButton />
          <RenderNotificationButton />
        </>
      )}
      {routes.name === navigationStrings.DRIVERS && (
        <Appbar.Action
          icon={'plus-thick'}
          style={{}}
          color="white"
          onPress={() => {
            navigation.navigate(navigationStrings.ADD_DRIVER, {});
          }}
        />
      )}
      {routes.name === navigationStrings.VEHICLES && (
        <Appbar.Action
          icon={'plus-thick'}
          style={{}}
          color="white"
          onPress={() => {
            navigation.navigate(navigationStrings.ADD_VEHICLE, {});
          }}
        />
      )}
    </View>
  );
};

// help button -------------------------------------------------------------------------
const RenderHelpButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={style.notificationContainer}
      onPress={() => navigation.navigate(navigationStrings.HELP_SCREEN)}>
      <Text style={style.helpText}>help</Text>
      <Avatar.Icon
        icon={iconPath.HELP}
        size={scale(10)}
        style={{backgroundColor: colorStrings.COLOR_PRIMARY}}
      />
    </TouchableOpacity>
  );
};

// notification button --------------------------------------------------------
const RenderNotificationButton = () => {
  const navigation = useNavigation();
  const {unread_notification} = useSelector(state => state.notification);
  return (
    <TouchableOpacity
      style={style.notificationContainer}
      onPress={() =>
        navigation.navigate(navigationStrings.NOTIFICATION_SCREEN)
      }>
      <Avatar.Icon
        icon={iconPath.BELL}
        size={scale(10)}
        style={{backgroundColor: colorStrings.COLOR_PRIMARY}}
      />
      {/* show total unread notification, if have  */}
      {unread_notification ? (
        <Badge size={scale(5)} style={style.badge}>
          {unread_notification}
        </Badge>
      ) : null}
    </TouchableOpacity>
  );
};
export default HeaderComponent;
