import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {imagePath} from '../../../constants';
import style from './style';

function Rate() {
  const [defaultRating, setDefaultRating] = useState(1);
  const maxRating = [1, 2, 3, 4, 5];

  const CustomRatingBar = () => {
    return (
      <View style={style.CustomRatingBar}>
        {maxRating.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={style.starImgStyle}
                source={
                  item <= defaultRating
                    ? imagePath.STAR_FILLED
                    : imagePath.STAR_CORNER
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={style.container}>
      <Text style={style.textStyle}>Rate this trip</Text>
      <CustomRatingBar />
      <Text style={style.textStyle}>
        {defaultRating + '/' + maxRating.length}
      </Text>
    </SafeAreaView>
  );
}

export default Rate;
