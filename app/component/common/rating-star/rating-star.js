import React from 'react';
import {View} from 'react-native';
import {colorStrings} from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RatingStar = ({rating, size}) => {
  const star = [];
  for (let index = 0; index < 5; index++) {
    const color = colorStrings.BLACK_PRIMARY;
    if (rating > index) color = colorStrings.NEON_ORANGE;
    star.push(<Icon key={index} name="hexagram" color={color} size={size} />);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        // marginTop: heightToDp(1),
        justifyContent: 'flex-start',
      }}>
      {star}
    </View>
  );
};

export default RatingStar;
