import React from 'react';
import {View} from 'react-native';
import style from './style';
import LottieView from 'lottie-react-native';
import {animationStrings} from '../../constants';
import {heightToDp, widthToDp} from '../../utils';

const LoadingView = ({
  height = heightToDp(50),
  width = widthToDp(50),
  container_style,
}) => {
  return (
    <>
      <View style={[style.container, {...container_style}]}>
        <LottieView
          source={animationStrings.LOADING_CIRCLE_ORANGE}
          autoPlay={true}
          loop={true}
          speed={1}
          style={{height, width}}
        />
      </View>
    </>
  );
};
export default LoadingView;
