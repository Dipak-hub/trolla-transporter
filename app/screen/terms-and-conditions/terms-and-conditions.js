import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HeaderComponent} from '../../component';
import {WebView} from 'react-native-webview';
import {colorStrings, navigationStrings} from '../../constants';
import {heightToDp, scale} from '../../utils';
import style from './style';

const TermsAndCondition = () => {
  return (
    <WebView
      style={style.webView}
      source={{uri: 'https://www.trollaexpress.com/terms-and-conditions'}}
    />
  );
};
const PrivacyPolicy = () => {
  return (
    <WebView
      style={style.webView}
      source={{uri: 'https://trollaexpress.com/privacy-policy'}}
    />
  );
};
const RefundAndCancelationPolicy = () => {
  return (
    <WebView
      style={style.webView}
      source={{
        uri: 'https://www.trollaexpress.com/refunds-and-cancellation-policy',
      }}
    />
  );
};
const PricingPolicy = () => {
  return (
    <WebView
      style={style.webView}
      source={{
        uri: 'https://www.trollaexpress.com/pricing-policy',
      }}
    />
  );
};

const Tnc = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    // <>
    //   <HeaderComponent
    //       hasDrawerButton={false}
    //       hasBackButton={true}
    //       title={navigationStrings.TERMS_AND_CONDITIONS_SCREEN}
    //   />
    //   {TermsAndCondition()}
    // </>

    <>
      {/* <HeaderComponent hasDrawerButton={true} title={navigationStrings.TRIPS} /> */}
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
          name="T&C"
          component={TermsAndCondition}
          options={{
            tabBarLabelStyle: {
              fontSize: scale(3.8),
              fontFamily: 'CeraPro-Bold',
              height: heightToDp(6),
            },
          }}
        />
        <Tab.Screen
          name="Privacy"
          component={PrivacyPolicy}
          options={{
            tabBarLabelStyle: {
              fontSize: scale(3.8),
              fontFamily: 'CeraPro-Bold',
              height: heightToDp(6),
            },
          }}
        />
        <Tab.Screen
          name="Pricing"
          component={PricingPolicy}
          options={{
            tabBarLabelStyle: {
              fontSize: scale(3.8),
              fontFamily: 'CeraPro-Bold',
              height: heightToDp(6),
            },
          }}
        />
        <Tab.Screen
          name="Refund"
          component={RefundAndCancelationPolicy}
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

export default Tnc;
