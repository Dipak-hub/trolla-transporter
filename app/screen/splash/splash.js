import React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {animationStrings, iconPath, navigationStrings} from '../../constants';
import style from './style';
import {heightToDp, widthToDp} from '../../utils';

const Splash = () => {
  const {success} = useSelector(state => state.auth);
  const navigation = useNavigation();
  // ----------------- Authentication using async local storage-------------------------------
  const checkIsLogin = async () => {
    if (success) {
      navigation.replace(navigationStrings.HOME_SCREEN);
    } else {
      navigation.replace(navigationStrings.LOGIN);
    }
  };
  //------------------------------------------------------------------------------------------------------
  return (
    <>
      <SafeAreaView>
        <View style={style.container}>
          {/* <Text style={{fontSize: 30}}> Welcome</Text> */}
          <View style={{alignItems: 'center'}}>
            <Image
              source={iconPath.TROLLA_LOGO}
              style={{height: 60, width: 220}}
            />

            <LottieView
              source={animationStrings.SPLASH_ANIMATION_VEHICLE_SMALL}
              autoPlay={true}
              loop={false}
              duration={3000}
              speed={1}
              style={{height: heightToDp(8), width: widthToDp(8)}}
            />
          </View>

          <LottieView
            source={animationStrings.SPLASH_ANIMATION_MAPS}
            autoPlay={true}
            loop={false}
            duration={3000}
            onAnimationFinish={() => checkIsLogin()}
            style={{
              height: heightToDp(50),
              width: widthToDp(50),
              alignSelf: 'center',
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Splash;
