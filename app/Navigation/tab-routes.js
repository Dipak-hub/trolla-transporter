import React, {useLayoutEffect, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  LoadsScreen,
  AccountScreen,
  TripsScreen,
  DashboardScreen,
} from '../screen/index';
import {Image} from 'react-native';
import style from './style';
import {heightToDp, scale} from '../utils';
import {useDrawerStatus} from '@react-navigation/drawer';
import {colorStrings, iconPath, navigationStrings} from '../constants';
import {Text} from 'react-native-paper';

import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

function TabRoutes({navigation}) {
  // const {myLoads} = useSelector(state => state.load);
  return (
    <Tab.Navigator
      options={{tabBarVisible: false}}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // position: 'absolute',
          paddingTop: heightToDp(0.5),
          // paddingBottom: heightToDp(1),
          height: heightToDp(6),
          // borderTopRightRadius: scale(5),
          // borderTopLeftRadius: scale(5),

          backgroundColor: colorStrings.WHITE_PRIMARY,
          elevation: 0,
        },
        tabBarActiveTintColor: colorStrings.COLOR_PRIMARY_YELLOW,
        // tabBarInactiveBackgroundColor: colorStrings.WHITE_PRIMARY,
        // tabBarActiveBackgroundColor: colorStrings.COLOR_PRIMARY_GREEN,
      }}>
      <Tab.Screen
        // style={{size: 30}}
        name={navigationStrings.HOME}
        component={DashboardScreen}
        // tabBarLabelStyle={{fontSize: 20}}

        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={iconPath.HOME}
                style={focused ? style.iconImageFocused : style.iconImage}
              />
            );
          },
          tabBarShowLabel: false,
          // headerTitleStyle: {
          //   fontSize: 20,
          //   color: 'blue',
          //   fontWeight: 'bold',
          // },
          // tabBarLabel: ({focused}) => (
          //   <Text style={focused ? style.labelFocused : style.label}>
          //     {navigationStrings.HOME}
          //   </Text>
          // ),
          // tabBarLabelStyle: {
          //   fontSize: scale(3.6),
          //   fontFamily: 'CeraPro-Bold',
          //   color: colorStrings.BLACK_PRIMARY,
          // },
        }}
      />
      <Tab.Screen
        name={navigationStrings.SEARCH_LOAD}
        component={LoadsScreen}
        options={{
          // tabBarBadge: myLoads.length,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={iconPath.LOAD}
                size={30}
                style={focused ? style.iconImageFocused : style.iconImage}
              />
            );
          },
          tabBarShowLabel: false,
          // tabBarLabel: ({focused}) => (
          //   <Text style={focused ? style.labelFocused : style.label}>
          //     {navigationStrings.SEARCH_LOAD}
          //   </Text>
          // ),
          // tabBarLabelStyle: {
          //   fontSize: scale(3.6),
          //   fontFamily: 'CeraPro-Bold',
          //   color: colorStrings.BLACK_PRIMARY,
          // },
        }}
      />
      <Tab.Screen
        name={navigationStrings.TRIPS}
        component={TripsScreen}
        options={{
          // tabBarBadge: 0,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={iconPath.TRIP}
                size={30}
                style={focused ? style.iconImageFocused : style.iconImage}
              />
            );
          },
          tabBarShowLabel: false,
          // tabBarLabel: ({focused}) => (
          //   <Text style={focused ? style.labelFocused : style.label}>
          //     {navigationStrings.TRIPS}
          //   </Text>
          // ),
          // tabBarLabelStyle: {
          //   fontSize: scale(3.6),
          //   fontFamily: 'CeraPro-Bold',
          //   color: colorStrings.BLACK_PRIMARY,
          // },
        }}
      />
      <Tab.Screen
        name={navigationStrings.ACCOUNT}
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={iconPath.ACCOUNT}
                size={30}
                style={focused ? style.iconImageFocused : style.iconImage}
              />
            );
          },
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          // tabBarLabel: ({focused}) => (
          //   <Text style={focused ? style.labelFocused : style.label}>
          //     {navigationStrings.ACCOUNT}
          //   </Text>
          // ),
          // tabBarLabelStyle: {
          //   fontSize: scale(3.6),
          //   fontFamily: 'CeraPro-Bold',
          //   color: colorStrings.BLACK_PRIMARY,
          // },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabRoutes;
