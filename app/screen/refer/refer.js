import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, TouchableOpacity, Image, Share} from 'react-native';
import {Text} from 'react-native-paper';
import {heightToDp, widthToDp, scale} from '../../utils';
import {iconPath, imagePath, navigationStrings} from '../../constants';
import style from './style';
import {HeaderComponent} from '../../component';

const Refer = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Join Trolla with Link to use Transporter Service!!\n\nhttps://play.google.com/store/apps/details?id=com.trolla.seal.transporter\n\nThe Official App for Transporter!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.REFER_APP_SCREEN}
      />
      <View
        style={{
          height: '100%',
          width: '100%',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <View style={{height: heightToDp(35)}}>
          <LinearGradient
            colors={['#FF4A37', '#FF8073', '#FFDDDA']}
            style={style.gradientView}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Image
              style={{marginTop: heightToDp(20), height: 150, width: 150}}
              source={imagePath.SHARE_BOY_PIC}></Image>

            <Image style={{}} source={imagePath.icQR}></Image>

            <Text>Share this app</Text>

            <Image
              source={imagePath.QR_CODE_DEMO}
              style={{
                height: scale(50),
                width: scale(50),
                marginTop: heightToDp(2),
              }}
            />
          </LinearGradient>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: heightToDp(30),
          }}>
          <TouchableOpacity
            onPress={() => onShare()}
            style={{alignItems: 'center'}}>
            <Image
              style={{height: 65, width: 65, marginBottom: 3}}
              source={iconPath.SHARE}></Image>
            <Text>Share Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default Refer;
