import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {DriverList, HeaderComponent} from '../../component';
import style from './style';
import {
  Avatar,
  Card,
  IconButton,
  Headline,
  Portal,
  Dialog,
  Button,
  Text,
} from 'react-native-paper';
import {globalStyles, size} from '../../themes';
import {useNavigation} from '@react-navigation/core';
import {scale} from '../../utils';
import {imagePath, navigationStrings} from '../../constants';
import {deleteDriver} from '../../store';
import {useSelector, useDispatch} from 'react-redux';

const DriverDetails = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const {documents, _id} = route.params;
  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.DRIVER_DETAILS}
      />

      <View style={globalStyles.container}>
        <DriverList driver={route.params} />

        <Card elevation={0} style={[globalStyles.mt_2, globalStyles.mb_2]}>
          <Headline style={{fontSize: size.COMPACT}}>Driving License</Headline>

          <Card.Cover
            source={{
              uri: documents.dl_document,
            }}
            style={style.documentImage}
            resizeMode="stretch"
          />
        </Card>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(navigationStrings.DRIVER_TRIPS, route.params);
          }}>
          <View style={[style.myTripContainer]}>
            <Text style={globalStyles.bigText}>Driver Trips</Text>
            <IconButton icon={imagePath.ARROW} color="black" size={10} />
          </View>
        </TouchableOpacity>

        <Button
          icon="account-plus"
          mode="contained"
          style={globalStyles.mt_4}
          onPress={() => setDeleteModalVisible(true)}>
          Delete Driver
        </Button>
      </View>

      {/* ----------------------------------- */}
      <Portal>
        <Dialog
          visible={deleteModalVisible}
          onDismiss={() => setDeleteModalVisible(!deleteModalVisible)}>
          <Text
            style={{
              fontSize: size.LARGE,
              textAlign: 'center',
              padding: scale(3),
            }}>
            Are you sure ?
          </Text>
          <Button
            onPress={() =>
              dispatch(deleteDriver(_id))
                .unwrap()
                .then(r => {
                  navigation.goBack();
                })
                .catch(e => {})
            }>
            Ok
          </Button>
          <Button onPress={() => setDeleteModalVisible(false)}>Cancel</Button>
        </Dialog>
      </Portal>
    </>
  );
};

export default DriverDetails;
