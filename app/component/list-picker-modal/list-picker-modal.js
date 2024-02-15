import React from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import {View, Text} from 'react-native';
import style from './style';

function ListPicker({title, hideModal, setData, data}) {
  const onPressItem = (item, h) => {
    setData(item);
    hideModal();
  };

  return (
    <View style={style.modalContainer}>
      <View style={style.container}>
        {/* <ScrollView>{stateDataRender}</ScrollView> */}
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={style.option}
              onPress={() => onPressItem(item.name)}>
              <Text style={style.optionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default ListPicker;
