import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-paper';
import style from './style';
import {iconPath, navigationStrings} from '../../../constants';
import {globalStyles} from '../../../themes';

const NotificationList = props => {
  // ------------------------------------------------------------------------------------
  return (
    <View style={style.listContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={globalStyles.flexRow}>
          <Image source={iconPath.MAIL} style={style.listImage} />
          <Text style={[globalStyles.bigText, globalStyles.ml_3]}>
            {props.title}{' '}
          </Text>
        </View>
        <View>
          <Text style={globalStyles.mediumText}>{props.ago} </Text>
        </View>
      </View>

      <Text style={globalStyles.mediumText}>{props.description} </Text>
    </View>
  );
};

export default NotificationList;
