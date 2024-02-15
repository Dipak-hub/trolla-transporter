import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Text, TextInput, Checkbox} from 'react-native-paper';
import style from './style';
import {iconPath, imagePath, navigationStrings} from '../../constants';
import {scale} from '../../utils';
import {globalStyles} from '../../themes';

const Login = () => {
  const navigation = useNavigation();

  // alert box  state --------------------------------------------------------
  const [alertMessage, setAlertMessage] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [checked, setChecked] = useState(true); // for check box

  const getOtp = async () => {
    if (!checked) {
      setAlertMessage({
        visible: true,
        title: '',
        message: 'Please read and agree to our Terms and conditions',
      });
    } else {
      if (phoneNumber.length === 10 && phoneNumber[0] != 0) {
        navigation.navigate(navigationStrings.OTP, {phoneNumber});
      } else {
        setAlertMessage({
          visible: true,
          title: '',
          message: 'Please enter a 10 digit valid mobile number',
        });
      }
    }
  };

  const mobileNumberHandler = num => {
    if (num.length === 10) Keyboard.dismiss();
    setPhoneNumber(num);
  };

  return (
    <ScrollView style={style.container}>
      <View style={{flexDirection: 'column'}}>
        <Image source={iconPath.TROLLA_LOGO} style={style.trollaLogo} />
        {/* <Image
          source={iconPath.TROLLA_LOADER_LOGO}
          style={style.trollaLogoSmall}
        /> */}
      </View>

      <Image
        source={imagePath.LOGIN_SCREEN_IMAGE}
        resizeMode="contain"
        style={style.image}
      />
      <View style={style.loginContainer}>
        <TextInput
          mode="outlined"
          label="Mobile Number"
          placeholder="Enter your 10 digit mobile number"
          keyboardType="phone-pad"
          style={style.textInput}
          maxLength={10}
          onChangeText={num => {
            mobileNumberHandler(num);
          }}
        />

        <Text style={style.termsAndConditionText}>
          By continuing, you agree that you have read and accept our
          <Text
            style={style.bottomTextLink}
            onPress={() =>
              navigation.navigate(navigationStrings.TERMS_AND_CONDITIONS_SCREEN)
            }>
            {' '}
            T&Cs and Privacy policy.
          </Text>
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={[style.loginButton]}
            onPress={() => getOtp()}>
            <Text style={style.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AwesomeAlert
        show={alertMessage.visible}
        showProgress={false}
        title={alertMessage.title}
        message={alertMessage.message}
        closeOnTouchOutside={true}
        animatedValue={0.8}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Ok"
        cancelButtonColor="#DD6B55"
        contentContainerStyle={{width: '80%'}}
        titleStyle={{fontSize: scale(6)}}
        messageStyle={{fontWeight: 'bold'}}
        cancelButtonTextStyle={{letterSpacing: 3}}
        onCancelPressed={() => {
          setAlertMessage({visible: false});
        }}
        // onConfirmPressed={() => {
        //   setAlert(true);
        // }}
      />
    </ScrollView>
  );
};

export default Login;
