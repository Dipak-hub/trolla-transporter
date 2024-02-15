import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/core';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useSelector, useDispatch} from 'react-redux';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {
  validateName,
  validateEmail,
  validateGst,
  validatePan,
  validatePhone,
  validateIfscCode,
  validateNameInBank,
} from '../../utils/Validation';

import {
  Avatar,
  Button,
  Headline,
  Checkbox,
  Text,
  Card,
  Title,
  Chip,
  List,
} from 'react-native-paper';
import style from './style';

import {ScrollView} from 'react-native-gesture-handler';
import {
  heightToDp,
  imagePickerCamera,
  imagePickerGallery,
  kycValidator,
  scale,
  widthToDp,
} from '../../utils/';
import {
  kycDocument,
  colorStrings,
  imagePath,
  navigationStrings,
  iconPath,
  kycDocumentBack,
} from '../../constants';

import RBSheet from 'react-native-raw-bottom-sheet';
import {
  StatusIndicator,
  PickPhotoBottomSheet,
  HeaderComponent,
  ListPicker,
  CustomDropdown,
} from '../../component';
import {PUBLIC_STORAGE_TRANSPORTER} from '@env';
import DropDown from 'react-native-paper-dropdown';

import {
  self,
  updateUserName,
  updateAddress,
  updateAddressProofType,
  updateIdProofType,
  updateEmail,
  updateMobileSecondary,
  updateIFSC,
  updateBankAccNo,
  updateBankAccName,
  updateUPI,
  kycUpdate,
  uploadProfilePic,
  uploadIdProof,
  uploadAddressProof,
  updateGstNumber,
  updatePanNumber,
  getTripsInfo,
  getArea,
  uploadAddressProofBackSide,
  deleteAddressProofBack,
} from '../../store';
import {globalStyles} from '../../themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Dropdown from '../../component/Dropdown/CustomDropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native';
const Account = () => {
  const {
    user,
    loading,
    error,
    isVerified,
    is_address_proof_uploaded,
    is_id_proof_uploaded,
  } = useSelector(state => state.user);
  const [prevEmail, setPrevEmail] = useState(user?.email);
  const [state, setState] = useState('');
  const [prevSecMobile, setPrevSecMobile] = useState(user?.mobile_secondary);
  const [isChanged, setIsChanged] = useState(true);
  const [checked, setChecked] = useState(true);
  const {total_pending_amount, total_earned_amount, trips_info_loading} =
    useSelector(state => state.trips);

  const {area} = useSelector(state => state.area);

  // console.log(user.documents);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refRBSheet = useRef(); // reference to bottom sheet
  const [currentType, setCurrentType] = useState(''); // upload document type
  const [documentName, setDocumentName] = useState(''); // upload document type
  // const [pickerMode, setPickerMode] = useState('camera');
  const [expanded, setExpanded] = useState(false);
  var loadFirstTime = useRef(0);

  //Ref for error focus
  const addressRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const secondaryMobileRef = useRef();
  const gstRef = useRef();
  const panRef = useRef();

  //ref for error focus end

  useFocusEffect(
    useCallback(() => {
      dispatch(getTripsInfo());
      loadFirstTime.current = loadFirstTime.current + 1;
    }, [loadFirstTime]),
  );

  // ------------- Awesome alert states-----------------------------------------------
  const [alertMessage, setAlertMessage] = useState({
    visible: false,
    title: '',
    message: '',
    apiSuccess: false,
  });

  // --------------------------chipBox---------------------------------
  const [addressProfChipBox, setAddressProfChipBox] = useState({
    documentType: '',
  });
  const [addressProfBackChipBox, setAddressProfBackChipBox] = useState({
    documentType: '',
  });
  const [idProfChipBox, setIdProfChipBox] = useState({
    documentType: '',
  });
  // -------------------chipBox------------------------------------------

  const bottomSheetHandle = (documentType, documentName) => {
    console.log(documentType + documentName);
    setCurrentType(documentType);
    setDocumentName(documentName);
    refRBSheet.current.open();
  };

  const setKYC = async (type, pickerType) => {
    const a =
      pickerType == 'camera' ? imagePickerCamera() : imagePickerGallery();
    a.then(path => {
      if (type === 'PROFILE_PIC') {
        upload(path, 'PROFILE_PIC');
      } else if (type === 'ID_PROOF') {
        upload(path, 'ID_PROOF', documentName);
      } else if (type === 'ADDRESS_PROOF') {
        upload(path, 'ADDRESS_PROOF', documentName);
      } else if (type === 'ADDRESS_PROOF_BACK') {
        upload(path, 'ADDRESS_PROOF_BACK');
      }
    }).catch(error => {
      // Alert.alert('Something wrong !');
    });
  };

  // upload profile pic into AWS ,
  const upload = async (path, documentType, documentName) => {
    // console.log('--------', documentName);
    if (documentType === 'PROFILE_PIC') {
      dispatch(uploadProfilePic(path));
    } else if (documentType === 'ID_PROOF') {
      dispatch(updateIdProofType(documentName));
      dispatch(uploadIdProof(path, documentName));
      // dispatch(updateIdProofType(documentType));
    } else if (documentType === 'ADDRESS_PROOF') {
      dispatch(updateAddressProofType(documentName));
      dispatch(uploadAddressProof({path, documentName}));
      // dispatch(updateAddressProofType(documentType));
    } else if (documentType === 'ADDRESS_PROOF_BACK') {
      dispatch(uploadAddressProofBackSide(path));
    }
  };
  // kyc handler ----------------------------------------------------------
  const showAlert = msg => {
    setAlertMessage({
      visible: true,
      title: '',
      message: msg,
    });
  };

  const handleUpdateEmail = e => {
    if (e.length === 0) {
      e = null;
    }
    if (prevEmail != e) {
      setIsChanged(false);
      dispatch(updateEmail(e));
    } else {
      setIsChanged(true);
      dispatch(updateEmail(e));
    }
  };
  const handleUpdateMobile = e => {
    if (e.length === 0) {
      e = null;
    }
    if (prevSecMobile != e) {
      setIsChanged(false);
      dispatch(updateMobileSecondary(e));
    } else {
      setIsChanged(true);
      dispatch(updateMobileSecondary(e));
    }
  };

  const kycHandler = () => {
    if (checked) {
      if (user.status !== 'Verified') {
        if (user?.user_name === 'Partner' || user?.user_name === '') {
          nameRef.current.focus();
          showAlert('Name should not be blank');
        } else if (
          user?.documents?.gst_number &&
          !validateGst(user?.documents?.gst_number)
        ) {
          gstRef.current.focus();
          showAlert('Enter a Valid GST number');
        } else if (
          user?.documents?.pan_number &&
          !validatePan(user?.documents?.pan_number)
        ) {
          panRef.current.focus();
          showAlert('Please enter a valid PAN number');
        } else if (!user?.address) {
          addressRef.current.focus();
          showAlert('Address should not be blank');

          // } else if (!user?.email) {
          //   showAlert('Please enter e-mail');
        } else if (
          user?.mobile_secondary?.length &&
          user?.mobile_secondary?.length !== 10
        ) {
          secondaryMobileRef.current.focus();
          showAlert('Please enter a valid secondary mobile number');
        } else if (user?.email && !validateEmail(user.email)) {
          emailRef.current.focus();
          showAlert('Please enter valid e-mail');
        } else if (!user?.documents?.address_proof_front) {
          showAlert('Please add your address proof');
        } else if (!user?.documents?.id_proof) {
          showAlert('Please add your id proof');
        } else if (user?.acc_number && user?.acc_number?.length < 8) {
          showAlert('Account number should be more than 8 characters');
        } else if (user?.ifsc_code && !validateIfscCode(user?.ifsc_code)) {
          showAlert('Please enter valid IFSC code');
        } else if (
          user?.name_in_bank &&
          !validateNameInBank(user?.name_in_bank)
        ) {
          showAlert('Please enter a valid bank holder name');
        } else {
          dispatch(kycUpdate())
            .then(() => {
              setAlertMessage({
                visible: true,
                title: '',
                message: 'Request submitted, Please wait for verification.',
              });
            })
            .catch(e => {});
        }
      } else {
        if (!validateEmail(user?.email)) {
          showAlert('Please Enter a valid e-mail');
        } else if (
          user?.mobile_secondary?.length &&
          user?.mobile_secondary?.length !== 10
        ) {
          showAlert('Please Enter a valid number');
        } else {
          dispatch(kycUpdate())
            .then(() => {
              setAlertMessage({
                visible: true,
                title: '',
                message: 'KYC Updated Successfully.',
              });
              setIsChanged(true);
              setPrevEmail(user?.email);
              setPrevSecMobile(user?.mobile_secondary);
            })
            .catch(e => {});
        }
      }
    } else {
      showAlert('Please Agree to the Terms & Conditions');
    }
  };

  // secondary document chipBox render method----------

  const addressProfDocumentTypeListRender = kycDocument.map((item, index) => {
    if (item === 'PROFILE PIC' || item === 'PAN CARD') return null;
    return (
      <View key={index} style={style.chip}>
        {user?.documents.address_proof_type == item ? (
          <Text>{user.documents.address_proof_front.split('/')[5]}</Text>
        ) : (
          <Text> {item}</Text>
        )}
        {user.documents.address_proof_type == item ? (
          <>
            <TouchableOpacity
              style={{position: 'absolute', right: 10}}
              onPress={() => dispatch(updateAddressProofType(null))}>
              <MaterialCommunityIcons name="delete-outline" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{position: 'absolute', right: 40}}
              onPress={() => {
                navigation.navigate(
                  navigationStrings.DOC_VIEWER,
                  user.documents.address_proof_front,
                );
              }}>
              <MaterialCommunityIcons name="eye-outline" size={20} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={{position: 'absolute', right: 10}}
            onPress={() => {
              setAddressProfChipBox({
                ...addressProfChipBox,
                documentType: item,
              });
              bottomSheetHandle('ADDRESS_PROOF', item);
            }}>
            <MaterialCommunityIcons name="upload" size={20} />
          </TouchableOpacity>
        )}
      </View>
      // <Chip
      //   key={index}
      //   onPress={() => {
      //     setAddressProfChipBox({...addressProfChipBox, documentType: item});
      //     bottomSheetHandle('ADDRESS_PROOF');
      //   }}
      //   selected={addressProfChipBox.documentType == item ? true : false}
      //   selectedColor={
      //     addressProfChipBox.documentType == item
      //       ? colorStrings.NEON_BLUE
      //       : null
      //   }
      //   mode="flat"
      //   textStyle={globalStyles.mediumText}
      //   style={style.chip}>
      //   {item}
      // </Chip>
    );
  });

  const addressProfBackDocumentTypeListRender = kycDocumentBack.map(
    (item, index) => {
      if (item === 'PROFILE PIC' || item === 'PAN CARD') return null;
      return (
        <View key={index} style={style.chip}>
          {user?.documents.address_proof_back ? (
            <Text>{user.documents.address_proof_back.split('/')[5]}</Text>
          ) : (
            <Text> {item}</Text>
          )}
          {user.documents.address_proof_back ? (
            <>
              <TouchableOpacity
                style={{position: 'absolute', right: 10}}
                onPress={() => dispatch(deleteAddressProofBack(null))}>
                <MaterialCommunityIcons name="delete-outline" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{position: 'absolute', right: 40}}
                onPress={() => {
                  navigation.navigate(
                    navigationStrings.DOC_VIEWER,
                    user.documents.address_proof_back,
                  );
                }}>
                <MaterialCommunityIcons name="eye-outline" size={20} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={{position: 'absolute', right: 10}}
              onPress={() => {
                setAddressProfChipBox({
                  ...addressProfChipBox,
                  documentType: item,
                });
                bottomSheetHandle('ADDRESS_PROOF_BACK');
              }}>
              <MaterialCommunityIcons name="upload" size={20} />
            </TouchableOpacity>
          )}
        </View>
        // <Chip
        //   key={index}
        //   onPress={() => {
        //     setAddressProfBackChipBox({
        //       ...addressProfBackChipBox,
        //       documentType: item,
        //     });
        //     bottomSheetHandle('ADDRESS_PROOF_BACK');
        //   }}
        //   selected={addressProfChipBox.documentType == item ? true : false}
        //   selectedColor={
        //     addressProfChipBox.documentType == item
        //       ? colorStrings.NEON_BLUE
        //       : null
        //   }
        //   mode="flat"
        //   textStyle={globalStyles.mediumText}
        //   style={style.chip}>
        //   {item}
        // </Chip>
      );
    },
  );

  console.log(user.documents);

  // primary document type render method-------------------------------------
  const idProfDocumentTypeListRender = kycDocument.map((item, index) => {
    if (item !== 'PAN CARD') return null;
    return (
      <View key={index} style={style.chip}>
        {user?.documents.id_proof_Type == item ? (
          <Text>{user.documents.id_proof.split('/')[5]}</Text>
        ) : (
          <Text> {item}</Text>
        )}
        {user.documents.id_proof_Type == item ? (
          <>
            <TouchableOpacity
              style={{position: 'absolute', right: 10}}
              onPress={() => dispatch(updateIdProofType(null))}>
              <MaterialCommunityIcons name="delete-outline" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{position: 'absolute', right: 40}}
            
              onPress={() => {
                navigation.navigate(
                  navigationStrings.DOC_VIEWER,
                  user.documents.id_proof,
                );
              }}>
              <MaterialCommunityIcons name="eye-outline" size={20} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={{position: 'absolute', right: 10}}
            onPress={() => {
              setIdProfChipBox({
                ...idProfChipBox,
                documentType: item,
              });
              bottomSheetHandle('ID_PROOF', item);
            }}>
            <MaterialCommunityIcons name="upload" size={20} />
          </TouchableOpacity>
        )}
      </View>
      // <TouchableOpacity
      //   onPress={() => {
      //     setAddressProfChipBox({...addressProfChipBox, documentType: item});
      //     bottomSheetHandle('ID_PROOF', item);
      //   }}
      //   key={index}
      //   style={style.chip}>
      //   <Text>{item}</Text>
      //   <MaterialCommunityIcons
      //     style={{position: 'absolute', right: 10}}
      //     name="upload"
      //     size={20}
      //   />
      // </TouchableOpacity>
      // <Chip
      //   key={index}
      //   onPress={() => {
      //     setIdProfChipBox({...idProfChipBox, documentType: item});
      //     bottomSheetHandle('ID_PROOF');
      //   }}
      //   selected={idProfChipBox.documentType == item ? true : false}
      //   selectedColor={
      //     idProfChipBox.documentType == item ? colorStrings.NEON_BLUE : null
      //   }
      //   mode="flat"
      //   textStyle={globalStyles.mediumText}
      //   style={style.chip}>
      //   {item}
      // </Chip>
    );
  });

  const loadTripInfo = () => {
    if (
      parseFloat(total_pending_amount) <= 0 &&
      parseFloat(total_earned_amount) <= 0
    ) {
      return null;
    } else {
      return (
        <View style={style.container}>
          <Card elevation={0}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={[globalStyles.justify]}>
                <Text style={globalStyles.mediumText} numberOfLines={1}>
                  Earning Amount
                </Text>
                <Text style={globalStyles.mediumText} numberOfLines={1}>
                  ₹ {total_earned_amount}
                </Text>
              </View>
              <View style={[globalStyles.justify]}>
                <Text style={globalStyles.mediumText} numberOfLines={1}>
                  Pending Amount
                </Text>
                <Text style={globalStyles.mediumText} numberOfLines={1}>
                  ₹ {total_pending_amount}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      );
    }
  };

  useEffect(() => {
    dispatch(getArea());
  }, []);
  return (
    <>
      {/* --------------- header -------------------------------------------------------- */}
      <HeaderComponent
        hasDrawerButton={false}
        title={navigationStrings.ACCOUNT}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={globalStyles.container}>
      >
        <View style={style.profilePictureContainer}>
          <TouchableOpacity
            style={style.profileIcon}
            disabled={isVerified}
            onPress={() => bottomSheetHandle('PROFILE_PIC')}>
            <Avatar.Image
              source={
                user.profile_pic
                  ? {
                      uri: user.profile_pic,
                    }
                  : iconPath.AVATAR
              }
              size={70}
            />
            <View style={style.editIcon}>
              <MaterialCommunityIcons
                // style={{position: 'absolute', bottom: 3, right: 0}}
                name="square-edit-outline"
                size={20}
              />
            </View>
          </TouchableOpacity>

          <StatusIndicator
            status={user.status}
            styles={style.statusIndicator}
          />
        </View>
        <View style={style.headlineTextContainer}>
          <Text style={[style.headlineText, globalStyles.largeText]}>
            Freightnow Transporters
          </Text>
          <View style={style.bottomSection}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={[style.bottomText, globalStyles.mediumText]}>
              I confirm that the details are as per Pancard
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            style={style.textInputNew}
            placeholder={'Name'}
            placeholderTextColor={'lightgray'}
            value={user?.user_name}
          />
          <TextInput
            style={style.textInputNew}
            placeholder={'Name'}
            placeholderTextColor={'lightgray'}
            value={user?.mobile_primary.toString()}
          />
          <TextInput
            style={style.textInputNew}
            placeholder={'Name'}
            placeholderTextColor={'lightgray'}
            value={user?.address}
          />
        </View>
        <View style={style.addressProofText}>
          <Text style={globalStyles.largeText}>Attach Address proof</Text>
          <Text style={[globalStyles.mediumText, {marginTop: heightToDp(1)}]}>
            Attach any one of the following proofs
          </Text>
          <View
            style={{
              width: widthToDp(90),
              height: heightToDp(10),
              backgroundColor: colorStrings.COLOR_PRIMARY_YELLOW,
              marginTop: heightToDp(2),
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
            }}>
            <Text style={globalStyles.mediumText}>
              The verification may need 8-12 hours from the time of submission
            </Text>
          </View>
        </View>
        {addressProfDocumentTypeListRender}

        {/* Back Side of selected document */}

        <View style={{padding: widthToDp(4), borderBottomWidth: 1}}></View>
        <View style={style.addressProofText}>
          <Text style={globalStyles.largeText}>
            Upload Back Side (optional)
          </Text>
        </View>
        {addressProfBackDocumentTypeListRender}

        {/* End */}

        <View style={{padding: widthToDp(4), borderBottomWidth: 1}}></View>
        <View style={style.addressProofText}>
          <Text style={globalStyles.largeText}>Attach ID proof</Text>
        </View>
        {idProfDocumentTypeListRender}

        <View style={{padding: widthToDp(4)}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={globalStyles.mediumText}>
              I confirm that I am legal operator of the Trolla and agree to the
              terms and conditions
            </Text>
            <TouchableOpacity>
              <Text>terms & conditions</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center', padding: widthToDp(4)}}>
          <TouchableOpacity
            style={{
              width: widthToDp(90),
              height: heightToDp(5),
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Text style={[globalStyles.mediumText, {color: 'white'}]}>
              Submit for Validation
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* ----------------------------- Bottom sheet ------------------------ */}

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
      </RBSheet>

      {/* -------------------- awesome alert --------------------------------------------- */}
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
          setAlertMessage({visible: false});
        }}
        onConfirmPressed={() => {
          setAlert(true);
        }}
      />
    </>
  );
};

export default Account;
