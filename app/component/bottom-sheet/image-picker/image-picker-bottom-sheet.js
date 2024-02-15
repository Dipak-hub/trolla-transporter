import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import style from './style';

const PickPhotoBottomSheet = ({refRBSheet}) => {
  const onPressHandle = type => refRBSheet.current.close(type);

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.item}
        onPress={() => onPressHandle('camera')}>
        <IconButton icon="camera" color="black" size={20} />
        <Text style={style.itemTitle}>Select From Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.item}
        onPress={() => onPressHandle('gallery')}>
        <IconButton icon="sd" color="black" size={20} />
        <Text style={style.itemTitle}>Select From Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickPhotoBottomSheet;
