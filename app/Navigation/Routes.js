import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationStrings} from '../constants';
import {
  SplashScreen,
  LoginScreen,
  OtpScreen,
  NotificationsScreen,
  HelpScreen,
  ConfirmedTripsDetailsScreen,
  CompleteTripsDetailsScreen,
  TrackingMapScreen,
  TermsAndConditionScreen,
  ReferScreen,
  LoadDetailsScreen,
  Vehicles,
  AddVehicle,
  VehicleDetails,
  Drivers,
  DriverDetails,
  AddDriver,
  DriverTrips,
  DriverTripDetails,
  DocViewer,
  RegisterScreen,
} from '../screen/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SideDrawer from './drawer/side-drawer';
import Test from '../screen/test';
import addDriver2 from '../screen/add-driver/add-driver2';
import addDriver3 from '../screen/add-driver/add-driver3';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={navigationStrings.SPLASH_SCREEN}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={navigationStrings.SPLASH_SCREEN}
          component={SplashScreen}
        />

        {/* test component */}
        <Stack.Screen name="test" component={Test} />

        <Stack.Screen name={navigationStrings.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={navigationStrings.REGISTER}
          component={RegisterScreen}
        />

        <Stack.Screen name={navigationStrings.OTP} component={OtpScreen} />

        <Stack.Screen
          name={navigationStrings.NOTIFICATION_SCREEN}
          component={NotificationsScreen}
        />

        <Stack.Screen
          name={navigationStrings.HELP_SCREEN}
          component={HelpScreen}
        />

        <Stack.Screen
          name={navigationStrings.HOME_SCREEN}
          component={SideDrawer}
        />

        <Stack.Screen
          name={navigationStrings.TRACKING_SCREEN}
          component={TrackingMapScreen}
        />

        <Stack.Screen
          name={navigationStrings.TERMS_AND_CONDITIONS_SCREEN}
          component={TermsAndConditionScreen}
        />
        <Stack.Screen
          name={navigationStrings.REFER_APP_SCREEN}
          component={ReferScreen}
        />
        <Stack.Screen
          name={navigationStrings.DRIVER_TRIPS}
          component={DriverTrips}
        />

        {/* ------------------- */}
        <Stack.Screen name={navigationStrings.VEHICLES} component={Vehicles} />
        <Stack.Screen
          name={navigationStrings.ADD_VEHICLE}
          component={AddVehicle}
        />
        <Stack.Screen name={navigationStrings.DRIVERS} component={Drivers} />
        <Stack.Screen
          name={navigationStrings.ADD_DRIVER}
          component={AddDriver}
        />
        <Stack.Screen
          name={navigationStrings.ADD_DRIVER_2}
          component={addDriver2}
        />
        <Stack.Screen
          name={navigationStrings.ADD_DRIVER_3}
          component={addDriver3}
        />
        {/* single details page--------------- */}

        <Stack.Screen
          name={navigationStrings.COMPLETE_TRIPS_DETAILS}
          component={CompleteTripsDetailsScreen}
        />
        <Stack.Screen
          name={navigationStrings.DRIVER_TRIPS_DETAILS}
          component={DriverTripDetails}
        />
        <Stack.Screen
          name={navigationStrings.CONFIRMED_TRIPS_DETAILS}
          component={ConfirmedTripsDetailsScreen}
        />
        <Stack.Screen
          name={navigationStrings.LOAD_DETAILS}
          component={LoadDetailsScreen}
        />
        <Stack.Screen
          name={navigationStrings.VEHICLE_DETAILS}
          component={VehicleDetails}
        />
        <Stack.Screen
          name={navigationStrings.DRIVER_DETAILS}
          component={DriverDetails}
        />
        <Stack.Screen
          name={navigationStrings.DOC_VIEWER}
          component={DocViewer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
