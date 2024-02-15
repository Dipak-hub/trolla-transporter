import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import style from './style';
import {widthToDp, heightToDp, scale} from '../../../utils';
import {colorStrings, status as sConst} from '../../../constants';

const StatusIndicator = ({status, styles}) => {
  let color = colorStrings.COLOR_PRIMARY_YELLOW;
  const borderRadius = status.toString().length == 1 ? scale(1) : scale(5);
  switch (status) {
    case sConst.VERIFIED:
      color = 'green';
      break;
    case sConst.PENDING:
      color = colorStrings.COLOR_PRIMARY_YELLOW;
      break;
    case sConst.REJECTED:
      color = 'red';
      break;
    case sConst.CREATED:
      color = colorStrings.COLOR_PRIMARY_BLUE;
      break;
    case sConst.COMPLETED:
      color = 'red';
      break;

    default:
      color = 'green';
  }
  return (
    <View style={styles}>
      <Text
        style={[style.statusIndicator, {backgroundColor: color, borderRadius}]}>
        {status}
      </Text>
    </View>
  );
};

export default StatusIndicator;
