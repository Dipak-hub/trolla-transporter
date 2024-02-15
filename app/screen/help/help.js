import React from 'react';
import {View, TouchableOpacity, Image, Linking} from 'react-native';
import {imagePath, iconPath, navigationStrings} from './../../constants';
import {Text} from 'react-native-paper';
import {HeaderComponent} from '../../component';
import style from './style';
import {globalStyles} from '../../themes';

const Help = () => {
  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.HELP_SCREEN}
      />
      <View style={globalStyles.container}>
        <Image
          resizeMode="contain"
          style={style.image}
          source={imagePath.CALL_CENTER}
        />

        <TouchableOpacity
          style={style.listItemContainer}
          onPress={() => Linking.openURL(`tel:${+7099033359}`)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={iconPath.PHONE_CALL} style={style.listItemImage} />
            <Text style={[globalStyles.bigText, globalStyles.ml_3]}>
              Talk To Us{' '}
            </Text>
          </View>

          <View>
            <Text style={globalStyles.bigText}>+91 7099033359 </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.listItemContainer}
          onPress={() =>
            Linking.openURL(`mailto:${'contact@trollaexpress.com'}`)
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={iconPath.MAIL} style={style.listItemImage} />
            <Text style={[globalStyles.bigText, globalStyles.ml_3]}>
              Email{' '}
            </Text>
          </View>

          <View>
            <Text style={globalStyles.bigText}>contact@trollaexpress.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.listItemContainer]}
          onPress={() =>
            Linking.openURL(`https:${'trollaexpress.com/feedback'}`)
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={iconPath.CHAT} style={style.listItemImage} />
            <Text style={[globalStyles.bigText, globalStyles.ml_3]}>
              FeedBack{' '}
            </Text>
          </View>

          <View>
            <Text style={globalStyles.bigText}>trollaexpress.com/feedback</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Help;
