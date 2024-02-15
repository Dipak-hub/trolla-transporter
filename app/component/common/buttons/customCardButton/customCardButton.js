import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {colorStrings} from '../../../../constants';
import style from './style';

const CustomCardButton = ({
  title,
  titleColor,
  onPress,
  styles,
  textStyle,
  disabled,
}) => {
  const textColor = titleColor ? titleColor : colorStrings.BLACK_PRIMARY;

  return (
    <Card style={[style.wrapper, {...styles}]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        <Text style={[style.text, {color: textColor, ...textStyle}]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

export default CustomCardButton;
