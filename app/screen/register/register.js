import React, {useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import style from './style';
import {
  CustomToggleButton,
  RegisterAsIndividual,
  RegisterAsCompany,
} from '../../component';
import {colorStrings, imagePath, navigationStrings} from '../../constants';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {kycUpdate, updateGstNumber, updateUserName} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  console.log(user);

  useEffect(() => {}, [user]);
  const handleSubmit = () => {
    dispatch(kycUpdate())
      .unwrap()
      .then(() => {
        navigation.navigate(navigationStrings.HOME_SCREEN);
      });
  };
  return (
    <View style={style.container}>
      <View style={style.registerContainer}>
        <View style={style.imageContainer}>
          <Image
            source={imagePath.REGISTER_IMAGE}
            resizeMode="contain"
            style={style.image}
          />
        </View>
        <TextInput
          mode="outlined"
          label="Company Name / Name"
          placeholder="Enter your company/name"
          keyboardType="default"
          style={style.textInput}
          onChangeText={name => {
            dispatch(updateUserName(name));
          }}
        />
        <TextInput
          mode="outlined"
          label="GST"
          placeholder="Enter your gst"
          keyboardType="default"
          style={style.textInput}
          onChangeText={gst => {
            dispatch(updateGstNumber(gst));
          }}
        />
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={style.submitButton}>
          <Text style={{color: colorStrings.SNOW_WHITE, fontWeight: 'bold'}}>
            Submit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(navigationStrings.HOME_SCREEN)}
          style={style.skipButton}>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
