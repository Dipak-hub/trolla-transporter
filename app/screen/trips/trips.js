import React from 'react';
import style from './style';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  TripCompletedFragment,
  TripPendingFragment,
  TripConfirmedFragment,
} from '../../fragment';
import {colorStrings, navigationStrings} from '../../constants';
import {heightToDp, scale} from '../../utils';

const Trips = ({route}) => {
  // const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      {/* < Header Component hasDrawerButton={true} title={navigationStrings.TRIPS} /> */}
      <Tab.Navigator
        screenOptions={{
          // tabBarLabelStyle: {fontSize: 14},
          tabBarStyle: {
            backgroundColor: colorStrings.COLOR_PRIMARY,
            height: heightToDp(6),
          },
          tabBarActiveTintColor: colorStrings.WHITE_PRIMARY,
          tabBarInactiveTintColor: colorStrings.BLACK_PRIMARY,
        }}>
        <Tab.Screen
          name={navigationStrings.QUOTATIONS}
          component={TripPendingFragment}
          options={{
            tabBarLabelStyle: {
              fontSize: scale(3.8),
              fontFamily: 'CeraPro-Bold',
              height: heightToDp(6),
            },
          }}
        />
        <Tab.Screen
          name={navigationStrings.CONFIRMED}
          component={TripConfirmedFragment}
          options={{
            tabBarLabelStyle: {
              fontSize: scale(3.8),
              fontFamily: 'CeraPro-Bold',
              height: heightToDp(6),
            },
          }}
        />
        <Tab.Screen
          name={navigationStrings.COMPLETED}
          component={TripCompletedFragment}
          options={{
            tabBarLabelStyle: {
              fontSize: scale(3.8),
              fontFamily: 'CeraPro-Bold',
              height: heightToDp(6),
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Trips;
