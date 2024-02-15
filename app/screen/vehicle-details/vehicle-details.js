import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {HeaderComponent, VehicleList} from '../../component';
import style from './style';
import {
  Text,
  Card,
  Portal,
  Headline,
  Button,
  Dialog,
  Avatar,
} from 'react-native-paper';
import {imagePath, navigationStrings} from '../../constants';
import {globalStyles, size} from '../../themes';
import {useSelector, useDispatch} from 'react-redux';
import {deleteVehicle} from '../../store/slice/vehicle-slice';
import {useNavigation} from '@react-navigation/core';
import {heightToDp, scale} from '../../utils';

const VehicleDetails = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const {
    rc_document,
    vehicle_image,
    _id,
    rc_number,
    owner_name,
    vehicle_type,
    body_type,
    load_capacity,
    status,
  } = route.params;
  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.VEHICLE_DETAILS}
      />
      <ScrollView style={globalStyles.container}>
        {/* top part (details)------------------------------------- */}
        <View style={[style.topCard, globalStyles.flexRowSpaceBetween]}>
          <View>
            <Text style={[globalStyles.largeText]}>{rc_number}</Text>
            <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
              Reg. To : {owner_name}
            </Text>
            <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
              Vehicle Type : {vehicle_type}
            </Text>
            <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
              Load Capacity : {load_capacity} MT
            </Text>
            <Text style={[globalStyles.bigText, globalStyles.mt_1]}>
              Body Type : {body_type}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={style.status}>
              <Text>{status}</Text>
            </View>
            <Avatar.Image
              size={scale(15)}
              source={
                vehicle_image === null
                  ? imagePath.DOC_BACKGROUND
                  : {
                      uri: vehicle_image,
                    }
              }
            />
          </View>
        </View>

        {/* document section--------------------------------------------- */}

        <Card elevation={0} style={[globalStyles.mt_2, globalStyles.mb_2]}>
          <Headline style={{fontSize: size.COMPACT}}>
            Registration Certificate
          </Headline>

          <Card.Cover
            source={{
              uri: rc_document,
            }}
            style={style.documentImage}
            resizeMode="stretch"
          />
        </Card>
        <Card elevation={0} style={[globalStyles.mt_2, globalStyles.mb_2]}>
          <Headline style={{fontSize: size.COMPACT}}>Vehicle Picture</Headline>

          <Card.Cover
            source={{
              uri: vehicle_image,
            }}
            style={style.documentImage}
            resizeMode="stretch"
          />
        </Card>

        <Button
          icon="account-plus"
          mode="contained"
          style={globalStyles.mt_4}
          onPress={() => setDeleteModalVisible(true)}>
          Delete Vehicle
        </Button>
        <View style={{marginTop: heightToDp(25)}}></View>
      </ScrollView>

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
              dispatch(deleteVehicle(_id))
                .unwrap()
                .then(route => {
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

export default VehicleDetails;
