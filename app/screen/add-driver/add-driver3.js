import {View, Text} from 'react-native';
import React from 'react';
import {
  Button,
  Card,
  Headline,
  IconButton,
  TextInput,
} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {imagePickerCamera, imagePickerGallery, scale} from '../../utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import {HeaderComponent, PickPhotoBottomSheet} from '../../component';
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles, size} from '../../themes';
import {colorStrings, navigationStrings} from '../../constants';
import {
  createDriver,
  driverFormDataClear,
  setDriverAccountNumber,
  setDriverIFSC,
  setDriverNameInBank,
  uploadDriverDl,
  uploadDriverProfilePic,
} from '../../store';
import style from './style';
import {
  validateDrivingLicense,
  validateIfscCode,
  validateName,
  validateNameInBank,
  validatePhone,
} from '../../utils/Validation';

export default function addDriver3() {
  const {isVerified} = useSelector(state => state.user);
  const {driver, loading, error_message, driver_photo_loading, dl_loading} =
    useSelector(state => state.driver);
  const {area} = useSelector(state => state.area);
  const dispatch = useDispatch();
  const refRBSheet = useRef(); // reference to bottom sheet
  const navigation = useNavigation();
  const [isDL, setDL] = useState('');
  const [isPhoto, setPhoto] = useState('');

  const [alertMessage, setAlertMessage] = useState({
    visible: false,
    title: '',
    message: '',
    apiSuccess: false,
  });

  const [currentType, setCurrentType] = useState(''); // upload document type
  const bottomSheetHandle = documentType => {
    setCurrentType(documentType);
    refRBSheet.current.open();
  };

  const setKYC = async (type, pickerType) => {
    const a =
      pickerType == 'camera' ? imagePickerCamera() : imagePickerGallery();
    a.then(path => {
      if (type === 'dl') {
        upload(path, 'dl');
        setDL(path);
      } else {
        setPhoto(path);
        upload(path, 'profile-image');
      }
    }).catch(error => {
      // Alert.alert('Something wrong !');
    });
  };

  const upload = async (path, documentType) => {
    if (documentType === 'dl') dispatch(uploadDriverDl(path));
    else dispatch(uploadDriverProfilePic(path));
  };

  const showAlert = msg => {
    setAlertMessage({
      visible: true,
      title: '',
      message: msg,
    });
  };
  const addDriver = () => {
    if (!driver?.dl_number) {
      showAlert('Please Enter Driving License Number');
    } else if (!validateDrivingLicense(driver?.dl_number)) {
      showAlert('Please Enter a valid Driving License Number');
    } else if (!driver?.user_name) {
      showAlert('Please Enter Driver Name');
    } else if (!validateName(driver?.user_name)) {
      showAlert('Please Enter Valid Driver Name');
    } else if (!driver?.mobile_primary) {
      showAlert('Please Enter Mobile Number');
    } else if (!validatePhone(driver?.mobile_primary)) {
      showAlert('Please Enter a valid mobile number');
    } else if (!driver?.address) {
      showAlert('Please Enter Address');
    } else if (driver?.ifsc_code && !validateIfscCode(driver?.ifsc_code)) {
      showAlert('Please enter valid IFSC code');
    } else if (driver?.acc_number && driver?.acc_number?.length < 8) {
      showAlert('Account number should be more than 8 characters');
    } else if (
      driver?.name_in_bank &&
      !validateNameInBank(driver?.name_in_bank)
    ) {
      showAlert('Please enter a valid bank holder name');
    } else {
      dispatch(createDriver())
        .unwrap()
        .then(() => {
          setAlertMessage({
            visible: true,
            title: '',
            message: 'Driver added, please wait for verification.',
            apiSuccess: true,
          });
        })
        .catch(e => {
          setAlertMessage({
            visible: true,
            title: '',
            message: e?.message || 'Mobile number or DL number already exist!',
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
        title={navigationStrings.ADD_DRIVER}
      />
      <Button
        icon="eraser"
        mode="text"
        onPress={() => dispatch(driverFormDataClear())}>
        Clear All
      </Button>
      <View style={style.progessBarContainer}>
        <View style={style.personalDetailsBar}>
          <Text style={style.progressBarTextActive}>Personal Details</Text>
          <View style={style.activeBar}></View>
        </View>
        <View style={style.personalDetailsBar}>
          <Text style={style.progressBarTextActive}>ID Proof</Text>
          <View style={style.activeBar}></View>
        </View>
        <View style={style.personalDetailsBar}>
          <Text style={style.progressBarTextActive}>Bank Details</Text>
          <View style={style.activeBar}></View>
        </View>
      </View>
      <View style={style.container}>
        <Card.Content style={globalStyles.mt_2}>
          <TextInput
            mode="outlined"
            label="Bank Account Number (Optional)"
            placeholder="eg: 20387565125515"
            keyboardType="phone-pad"
            value={driver?.acc_number}
            onChangeText={e => dispatch(setDriverAccountNumber(e))}
            style={[style.textInput, globalStyles.mediumText]}
            maxLength={18}
          />
        </Card.Content>
        <Card.Content style={globalStyles.mt_2}>
          <TextInput
            mode="outlined"
            label="Bank IFSC Code (Optional)"
            placeholder="eg: SBIN0000222"
            autoCapitalize="characters"
            // keyboardType="phone-pad"
            value={driver?.ifsc_code}
            onChangeText={e => dispatch(setDriverIFSC(e))}
            style={[style.textInput, globalStyles.mediumText]}
            maxLength={11}
          />
        </Card.Content>
        <Card.Content style={globalStyles.mt_2}>
          <TextInput
            mode="outlined"
            label="Name In Bank Account (Optional)"
            // placeholder="eg: Bikram Singh"
            // keyboardType="phone-pad"
            value={driver?.name_in_bank}
            onChangeText={e => dispatch(setDriverNameInBank(e))}
            style={[style.textInput, globalStyles.mediumText]}
            maxLength={20}
          />
        </Card.Content>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button
            color={colorStrings.COLOR_PRIMARY_YELLOW}
            style={style.button}
            mode="contained"
            disabled={loading}
            onPress={() => {
              navigation.goBack();
              // addDriver();
            }}>
            Previous
          </Button>
          <Button
            style={style.button}
            mode="contained"
            disabled={loading}
            onPress={() => {
              // navigation.navigate(navigationStrings.ADD_DRIVER_3);
              addDriver();
            }}>
            Submit
          </Button>
        </View>
      </View>
      {/* <View>
        <Card.Content
          elevation={0}
          style={[globalStyles.mt_2, globalStyles.mb_2]}>
          <Headline style={{fontSize: size.COMPACT}}>
            Attach Driving License
          </Headline>
          <TouchableOpacity
            onPress={() => {
              bottomSheetHandle('dl');
            }}>
            <View style={globalStyles.flexRowSpaceBetween}>
              <Text style={globalStyles.mediumText}>
                Upload Driving License Photo
              </Text>
              <IconButton icon="camera" size={scale(8)} />
            </View>
          </TouchableOpacity>

          {dl_loading && <ActivityIndicator size={'large'} color="tomato" />}

          {driver?.dl_document && (
            <Card.Cover
              source={{uri: driver.dl_document}}
              style={style.documentImage}
              resizeMode="stretch"
            />
          )}
        </Card.Content>

        <Card.Content
          elevation={0}
          style={[globalStyles.mt_2, globalStyles.mb_2]}>
          <Headline style={{fontSize: size.COMPACT}}>
            Attach Driver Photo
          </Headline>
          <TouchableOpacity
            onPress={() => {
              bottomSheetHandle('profile-image');
            }}>
            <View style={globalStyles.flexRowSpaceBetween}>
              <Text style={globalStyles.mediumText}>Upload Driver Photo</Text>
              <IconButton icon="camera" size={scale(8)} />
            </View>
          </TouchableOpacity>

          {driver_photo_loading && (
            <ActivityIndicator size={'large'} color="tomato" />
          )}

          {driver?.profile_pic && (
            <Card.Cover
              source={{
                uri: driver.profile_pic,
              }}
              style={style.documentImage}
              resizeMode="stretch"
            />
          )}
        </Card.Content>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        onClose={pickerType => pickerType && setKYC(currentType, pickerType)}
        closeDuration={0} // close duration
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: colorStrings.BLACK_PRIMARY,
          },
        }}>
        <PickPhotoBottomSheet refRBSheet={refRBSheet} setKYC={setKYC} />
      </RBSheet> */}

      <AwesomeAlert
        show={alertMessage.visible}
        showProgress={false}
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
          // setAlertMessage({visible: false});
          if (alertMessage.apiSuccess) {
            dispatch(driverFormDataClear());
            navigation.navigate(navigationStrings.DRIVERS);
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
  );
}
