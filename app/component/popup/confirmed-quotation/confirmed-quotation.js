import React from 'react';
import {View} from 'react-native';
import {Divider, Text, Title} from 'react-native-paper';
import {colorStrings} from '../../../constants';
import {globalStyles} from '../../../themes';

import style from './style';

function ConfirmedQuotation({date, amount}) {
  return (
    <View style={style.container}>
      <Title style={[globalStyles.mt_1, {textAlign: 'center'}]}>
        Confirm Quotation
      </Title>
      <Divider style={globalStyles.mb_3} />

      <Text>
        Amount Quoted : {'\u20B9 '}
        {amount}
      </Text>
      <Text>Delivery By : {date}</Text>

      <Text style={[globalStyles.mt_2, {color: colorStrings.TOMATO}]}>
        Note:{'\n'}Kindly make sure if the amount is correct.
      </Text>

      <Text style={[globalStyles.mb_2, {color: colorStrings.TOMATO}]}>
        By confirming you agree to assign a driver and a truck once the
        Quotation is accepted by the loader {'\n'}
      </Text>
    </View>
  );
}

export default ConfirmedQuotation;
