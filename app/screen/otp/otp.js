import React, {useState, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNOtpVerify from 'react-native-otp-verify';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Text} from 'react-native-paper';
import style from './style';
import {colorStrings, imagePath, navigationStrings} from '../../constants';
import {
  authStateClear,
  login as userLogin,
  sendOtp,
  authStateError,
  self,
} from '../../store';
import {scale} from '../../utils';
import {HeaderComponent, LoadingView} from '../../component';
import {globalStyles} from '../../themes';
import {CommonActions} from '@react-navigation/native';

const Otp = ({route}) => {
  const {success, loading, accessToken, refreshToken, error_message, goBack} =
    useSelector(state => state.auth);
  const {user_name, _id} = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {phoneNumber} = route.params;

  // ------------- Awesome alert states-----------------------------------------------
  const [alertMessage, setAlertMessage] = useState({
    visible: false,
    title: '',
    message: '',
  });
  // text box state ----------------------------------------------------
  const [pinState, setPinState] = useState({
    pin1: '',
    pin2: '',
    pin3: '',
    pin4: '',
  });
  // text box reference ---------------------------------------------------
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  //  pin state -------------------------------------------------
  const {pin1, pin2, pin3, pin4} = pinState;

  // text box onchange handle function ----------------------------------
  const onChangeHandle = (pin, value) => {
    setPinState({...pinState, [pin]: value}); // set state key is coming from #pin and value from #value
    if (pin == 'pin1' && value != '') inputRef2.current.focus();
    else if (pin == 'pin2' && value != '') inputRef3.current.focus();
    else if (pin == 'pin3' && value != '') inputRef4.current.focus();
    //  go focus to backward
    else {
      if (pin == 'pin4' && value == '') {
        setPinState({...pinState, pin4: ''});
        inputRef3.current.focus();
      } else if (pin == 'pin3' && value == '') {
        setPinState({...pinState, pin3: ''});
        inputRef2.current.focus();
      } else if (pin == 'pin2' && value == '') {
        setPinState({...pinState, pin2: ''});
        inputRef1.current.focus();
      } else if (pin == 'pin1' && value == '') {
        setPinState({...pinState, pin1: ''});
        inputRef1.current.focus();
      }
    }
  };

  useEffect(() => {
    dispatch(sendOtp(phoneNumber));
    // RNOtpVerify.getHash().then(console.log).catch(console.log); // to see the hash code ( dev env only)
  }, []);

  useEffect(() => {
    //  login dependency
    if (pin4 != '') logIn();
  }, [pin4]);

  // validate OTP and log in function ----------------------------------
  const logIn = () => {
    const jointOtp = `${pin1}${pin2}${pin3}${pin4}`;
    if (jointOtp)
      dispatch(userLogin({mobile_primary: phoneNumber, otp: jointOtp}));
    // else setAlertMessage({visible: true, message: 'Incorrect OTP'});
  };
  //  dependency for #use login reducer success state------------------
  useEffect(() => {
    if (success) {
      saveToken();
      dispatch(self())
        .unwrap()
        .then(res => {
          if (res.user.user_name === 'Partner') {
            navigation.reset({
              index: 0,
              routes: [{name: navigationStrings.REGISTER}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: navigationStrings.HOME_SCREEN}],
            });
          }
        });
    }
  }, [success]);

  const saveToken = async () => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  };

  useEffect(() => {
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler)) // get otp sms from device and add listener to read otp from phone
      .catch(e => {});

    return () => {
      RNOtpVerify.removeListener(); // clear listener
    };
  }, []);

  useEffect(() => {
    if (error_message) {
      setAlertMessage({visible: true, message: error_message});
    }
  }, [error_message]);

  const otpHandler = message => {
    // separating 4 digit otp number from text SMS
    const otp = /(\d{4})/g.exec(message)[1];
    setPinState({
      pin1: otp[0],
      pin2: otp[1],
      pin3: otp[2],
      pin4: otp[3],
    });
    Keyboard.dismiss();
  };

  // ------------- OTP countdown timer -----------------------
  const [counter, setCounter] = useState(59);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const resendOtp = () => {
    dispatch(sendOtp(phoneNumber));
    setCounter(59);
  };

  const alertActionHandler = () => {
    if (goBack) {
      navigation.dispatch(CommonActions.goBack());
    }
    dispatch(authStateError(false));
    setAlertMessage({visible: false});
  };

  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title="Mobile Number Verification"
      />

      {loading ? (
        <LoadingView />
      ) : (
        <View style={globalStyles.container}>
          <Image
            source={imagePath.AUTHENTICATION_BOY_IMAGE}
            resizeMode="contain"
            style={style.image}></Image>

          <Text style={style.enterOtpText}>
            {' '}
            Enter the 4-digit code sent to you at {phoneNumber}
          </Text>

          <View style={style.inputBoxContainer}>
            <TextInput
              mode="flat"
              label=""
              placeholder=""
              keyboardType="phone-pad"
              style={style.textInput}
              maxLength={1}
              onChangeText={pin1 => onChangeHandle('pin1', pin1)}
              value={pin1}
              ref={inputRef1}
              selectionColor={colorStrings.COLOR_PRIMARY}
              underlineColorAndroid="transparent"
            />
            <TextInput
              mode="flat"
              label=""
              placeholder=""
              keyboardType="phone-pad"
              style={style.textInput}
              maxLength={1}
              onChangeText={pin2 => onChangeHandle('pin2', pin2)}
              value={pin2}
              ref={inputRef2}
              selectionColor={colorStrings.COLOR_PRIMARY}
              underlineColorAndroid="transparent"
            />
            <TextInput
              mode="flat"
              label=""
              placeholder=""
              keyboardType="phone-pad"
              style={style.textInput}
              maxLength={1}
              onChangeText={pin3 => onChangeHandle('pin3', pin3)}
              value={pin3}
              ref={inputRef3}
              selectionColor={colorStrings.COLOR_PRIMARY}
              underlineColorAndroid="transparent"
            />
            <TextInput
              mode="flat"
              label=""
              placeholder=""
              keyboardType="phone-pad"
              style={style.textInput}
              maxLength={1}
              onChangeText={pin4 => onChangeHandle('pin4', pin4)}
              value={pin4}
              ref={inputRef4}
              selectionColor={colorStrings.COLOR_PRIMARY}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={style.buttonContainer}>
            {counter !== 0 && (
              <Text style={[globalStyles.mediumText, {alignSelf: 'center'}]}>
                resend after {counter} sec
              </Text>
            )}

            <TouchableOpacity
              disabled={counter !== 0}
              onPress={() => resendOtp()}>
              <Text
                style={[
                  globalStyles.mediumText,
                  {textAlign: 'center', padding: scale(3)},
                ]}>
                I didn't receive a code ,Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* alert box -------------------------------------- */}

      <AwesomeAlert
        show={alertMessage.visible}
        title={alertMessage.title}
        message={alertMessage.message}
        closeOnTouchOutside={true}
        animatedValue={0.8}
        showCancelButton={true}
        cancelText="Ok"
        cancelButtonColor="#DD6B55"
        contentContainerStyle={{width: '80%'}}
        titleStyle={{fontSize: scale(6)}}
        messageStyle={{fontWeight: 'bold'}}
        onCancelPressed={() => {
          alertActionHandler();
        }}
      />

      {/* <AwesomeAlert
        show={error}
        title="Something wrong !"
        message="Please check your internet connection. "
        animatedValue={0.2}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Ok"
        cancelButtonColor="#DD6B55"
        contentContainerStyle={{width: '80%'}}
        titleStyle={{fontSize: 24}}
        messageStyle={{fontWeight: 'bold'}}
        onCancelPressed={() => {
          alertActionhandler();
        }}
      /> */}
    </>
  );
};

export default Otp;
