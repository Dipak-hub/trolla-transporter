import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  CustomCardButton,
  CustomToggleButton,
  HeaderComponent,
  PickPhotoBottomSheet,
} from '../../component';
import style from './style';
import {
  Text,
  TextInput,
  Chip,
  Title,
  Card,
  Headline,
  IconButton,
  Button,
} from 'react-native-paper';
import {navigationStrings, imagePath, colorStrings} from '../../constants';
import {globalStyles, size} from '../../themes';
import {
  scale,
  widthToDp,
  imagePickerCamera,
  imagePickerGallery,
  heightToDp,
} from '../../utils';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useNavigation} from '@react-navigation/core';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector, useDispatch} from 'react-redux';
import {
  createVehicle,
  setVehicleBodyType,
  setVehicleLoadCapacity,
  setVehicleOwnerName,
  setVehicleRCNumber,
  setVehicleType,
  uploadOwnerPancard,
  uploadVehicleImage,
  uploadVehicleRcDocument,
  vehicleFormDataClear,
} from '../../store/slice/vehicle-slice';

import {validateVehicleNumber} from '../../utils/Validation';
import {useEffect} from 'react';
import {getVehicleTypes} from '../../store';

const AddVehicle = () => {
  const {
    vehicle,
    loading,
    error,
    vehicle_photo_loading,
    vehicle_rc_loading,
    owner_pancard_loading,
  } = useSelector(state => state.vehicle);
  const {isVerified} = useSelector(state => state.user);
  const {vehicle_types} = useSelector(state => state.masterDb);

  const dispatch = useDispatch();

  const [alertMessage, setAlertMessage] = useState({
    visible: false,
    title: '',
    message: '',
    apiSuccess: true,
  });
  const refRBSheet = useRef(); // reference to bottom sheet
  const [currentType, setCurrentType] = useState(''); // pick document type
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getVehicleTypes());
  }, []);

  const bottomSheetHandle = documentType => {
    setCurrentType(documentType);
    refRBSheet.current.open();
  };
  const setKYC = async (type, pickerType) => {
    const a =
      pickerType == 'camera' ? imagePickerCamera() : imagePickerGallery();
    a.then(path => {
      if (type === 'rc') {
        upload(path, 'rc');
      } else if (type === 'owner-pancard') {
        upload(path, 'owner-pancard');
      } else {
        upload(path, 'vehicle-image');
      }
    }).catch(error => {
      // Alert.alert('Something wrong !');
    });
  };

  const upload = async (path, documentType) => {
    if (documentType === 'rc') {
      dispatch(uploadVehicleRcDocument(path));
    } else if (documentType === 'owner-pancard') {
      dispatch(uploadOwnerPancard(path));
    } else {
      dispatch(uploadVehicleImage(path));
    }
  };

  // const [success, setSuccess] = useState(false); // add vehicle success state

  // const wheels = ['6', '10', '12', '14', '16', '18', '22'];
  const vehicleTypes = vehicle_types?.map((item, index) => {
    return (
      <Chip
        key={index}
        icon="record-circle-outline"
        onPress={() => dispatch(setVehicleType(item))}
        selected={vehicle?.vehicle_type == item.vehicle_type ? true : false}
        selectedColor={
          vehicle?.vehicle_type == item.vehicle_type
            ? colorStrings.NEON_BLUE
            : null
        }
        mode="flat"
        textStyle={globalStyles.mediumText}
        style={style.chip}>
        {item.vehicle_type}
      </Chip>
    );
  });
  const onSelectSwitch = value => dispatch(setVehicleBodyType(value));

  const showAlert = msg => {
    setAlertMessage({
      visible: true,
      title: '',
      message: msg,
    });
  };

  const addVehicle = () => {
    if (!validateVehicleNumber(vehicle?.rc_number)) {
      showAlert('Please enter a valid vehicle number.');
    } else if (!vehicle?.owner_name) {
      showAlert('Please enter owner name');
    } else if (!vehicle?.vehicle_type) {
      showAlert('Please select your vehicle type');
    } else if (!vehicle?.load_capacity) {
      showAlert('Please enter load capacity');
    } else if (!vehicle?.rc_document) {
      showAlert('Please upload a picture of vehicle RC');
    } else if (!vehicle?.vehicle_image) {
      showAlert('Please Upload picture of vehicle image');
    } else {
      dispatch(createVehicle())
        .unwrap()
        .then(() => {
          setAlertMessage({
            visible: true,
            title: '',
            message: 'Vehicle added, please wait for verification.',
            apiSuccess: true,
          });
        })
        .catch(e => {
          setAlertMessage({
            visible: true,
            title: '',
            message: e?.message || 'Registration number is already exist !',
            apiSuccess: false,
          });
        });
    }
  };
  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.ADD_VEHICLE}
      />
      {/* {isVerified ? ( */}
      <>
        <Button
          icon="eraser"
          mode="text"
          onPress={() => dispatch(vehicleFormDataClear())}>
          Clear All
        </Button>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={globalStyles.container}>
          <Card.Content style={globalStyles.mt_2}>
            <TextInput
              mode="outlined"
              label="Registration Number"
              placeholder="eg : AS01EK2828"
              keyboardType="default"
              autoCapitalize="characters"
              value={vehicle?.rc_number}
              onChangeText={e => dispatch(setVehicleRCNumber(e))}
              style={[style.textInput, globalStyles.mediumText]}
              maxLength={10}
            />
          </Card.Content>

          <Card.Content style={globalStyles.mt_2}>
            <TextInput
              mode="outlined"
              label="Owner's Name"
              // placeholder="eg : Bikram Singh"
              keyboardType="default"
              value={vehicle?.owner_name}
              onChangeText={e => dispatch(setVehicleOwnerName(e))}
              style={[style.textInput, globalStyles.mediumText]}
              maxLength={16}
              // right={<TextInput.Affix text="/MT" />}
              // left={<TextInput.Icon name="weight" />}
            />
          </Card.Content>

          <Card.Content style={globalStyles.mt_2}>
            <Title style={{fontSize: size.COMPACT}}>Vehicle Type</Title>
            <ScrollView
              horizontal
              style={style.chipBox}
              showsHorizontalScrollIndicator={true}>
              {vehicleTypes}
            </ScrollView>
          </Card.Content>

          <Card.Content style={globalStyles.mt_2}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <TextInput
                mode="outlined"
                label="Load Capacity"
                placeholder="eg : 30 MT"
                disabled={true}
                keyboardType="number-pad"
                value={vehicle?.load_capacity.toString()}
                onChangeText={e => dispatch(setVehicleLoadCapacity(e))}
                style={[
                  style.textInput,
                  globalStyles.mediumText,
                  globalStyles.mr_4,
                  {width: widthToDp(40)},
                ]}
                maxLength={4}
                right={<TextInput.Affix text="/MT" />}
                // left={<TextInput.Icon name="weight" />}
              />
              <View style={{alignItems: 'center'}}>
                <Title style={[globalStyles.mb_1, {fontSize: size.COMPACT}]}>
                  Body Type
                </Title>
                <CustomToggleButton
                  option1={'Open'}
                  option2={'Close'}
                  selectedMode={1}
                  onSelectSwitch={onSelectSwitch}
                  width={widthToDp(40)}
                />
              </View>
            </View>
          </Card.Content>

          {/* pancard of owner starts*/}

          <Card.Content
            elevation={0}
            style={[globalStyles.mt_2, globalStyles.mb_2]}>
            <Headline style={{fontSize: size.COMPACT}}>
              Upload owner's pancard
            </Headline>
            <TouchableOpacity
              onPress={() => bottomSheetHandle('owner-pancard')}>
              <View style={globalStyles.flexRowSpaceBetween}>
                <Text style={globalStyles.mediumText}>
                  Documents details must be clear and visible
                </Text>
                <IconButton icon="camera" size={scale(8)} />
              </View>
            </TouchableOpacity>

            {owner_pancard_loading && (
              <ActivityIndicator size={'large'} color="tomato" />
            )}

            {vehicle.owner_pancard_image && (
              <Card.Cover
                source={{
                  uri: vehicle.owner_pancard_image,
                }}
                style={style.documentImage}
                resizeMode="stretch"
              />
            )}
          </Card.Content>

          {/* pancard of owner ends */}

          <Card.Content
            elevation={0}
            style={[globalStyles.mt_2, globalStyles.mb_2]}>
            <Headline style={{fontSize: size.COMPACT}}>
              Attach Registration Certificate
            </Headline>
            <TouchableOpacity onPress={() => bottomSheetHandle('rc')}>
              <View style={globalStyles.flexRowSpaceBetween}>
                <Text style={globalStyles.mediumText}>
                  Documents details must be clear and visible
                </Text>
                <IconButton icon="camera" size={scale(8)} />
              </View>
            </TouchableOpacity>

            {vehicle_rc_loading && (
              <ActivityIndicator size={'large'} color="tomato" />
            )}

            {vehicle.rc_document && (
              <Card.Cover
                source={{
                  uri: vehicle.rc_document,
                }}
                style={style.documentImage}
                resizeMode="stretch"
              />
            )}
          </Card.Content>

          <Card.Content
            elevation={0}
            style={[globalStyles.mt_2, globalStyles.mb_2]}>
            <Headline style={{fontSize: size.COMPACT}}>
              Attach a photo of your vehicle
            </Headline>
            <TouchableOpacity
              onPress={() => bottomSheetHandle('vehicle-image')}>
              <View style={globalStyles.flexRowSpaceBetween}>
                <Text style={globalStyles.mediumText}>
                  Number Plate should be visible
                </Text>
                <IconButton icon="camera" size={scale(8)} />
              </View>
            </TouchableOpacity>

            {vehicle_photo_loading && (
              <ActivityIndicator size={'large'} color="tomato" />
            )}

            {vehicle.vehicle_image && (
              <Card.Cover
                source={{
                  uri: vehicle.vehicle_image,
                }}
                style={style.documentImage}
                resizeMode="stretch"
              />
            )}
            <Button
              disabled={loading}
              icon="truck"
              mode="contained"
              style={globalStyles.mt_4}
              onPress={() => {
                addVehicle();
              }}>
              Add Vehicle
            </Button>
          </Card.Content>

          <View style={{marginBottom: heightToDp(25)}}></View>
        </ScrollView>

        {/* ----------------------------- Bottom sheet------------------------ */}

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          onClose={pickerType => pickerType && setKYC(currentType, pickerType)}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: colorStrings.BLACK_PRIMARY,
            },
          }}>
          <PickPhotoBottomSheet refRBSheet={refRBSheet} setKYC={setKYC} />
        </RBSheet>
        {/* -------------------------------------------------- */}
        <AwesomeAlert
          show={alertMessage.visible}
          title={alertMessage.title}
          message={alertMessage.message}
          closeOnTouchOutside={true}
          animatedValue={0.8}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="ok"
          cancelButtonColor="#DD6B55"
          contentContainerStyle={{width: '80%'}}
          titleStyle={{fontSize: scale(5)}}
          messageStyle={{fontWeight: 'bold', textAlign: 'center'}}
          onCancelPressed={() => {
            if (alertMessage.apiSuccess) {
              dispatch(vehicleFormDataClear());
              navigation.goBack();
            }

            setAlertMessage({
              visible: false,
              title: '',
              message: '',
              apiSuccess: false,
            });
          }}
        />
      </>
      {/* ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate(navigationStrings.ACCOUNT)}>
          <Text
            allowFontScaling={false}
            style={{
              textAlign: 'center',
              fontSize: size.LARGE,
              marginBottom: heightToDp(6),
              marginTop: heightToDp(10),
            }}>
            You have to complete your KYC first
          </Text>
        </TouchableOpacity>
      )} */}
    </>
  );
};

export default AddVehicle;
