import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {
  Button,
  Card,
  Text,
  Subheading,
  Portal,
  Dialog,
  Title,
  TextInput,
  Headline,
  IconButton,
  Checkbox,
  Divider,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import style from './style';
import {
  HeaderComponent,
  LiveDirectionMap,
  RatingStar,
  ConfirmQuotation,
  LoadingView,
} from '../../component';
import {
  navigationStrings,
  colorStrings,
  mapType,
  constants,
} from '../../constants';
import {
  createBid,
  getSinglePendingTrip,
  setBidAmount,
  setBidChecked,
  setBidDeliveryDate,
  setBidInitialValue,
} from '../../store';
import {heightToDp, scale, widthToDp} from '../../utils';
import {fonts, size, globalStyles} from '../../themes';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {flatten} from '@reduxjs/toolkit/dist/query/utils';
import {
  getHaveVerifiedVehicle,
  getVehicles,
} from '../../store/slice/vehicle-slice';
const LoadDetails = ({route}) => {
  const [confirmedModalVisible, setConfirmModalVisible] = useState(false);

  // bid details ----------------------------------
  const {bid} = useSelector(state => state.load);
  const {user} = useSelector(state => state.user);

  const {quotation_id, booking_id} = route.params;

  const [preBidAmount, setPreBidAmount] = useState(null);

  let trip,
    is_loading = false,
    screen_type = 'load_details';

  if (route.params?.load) {
    screen_type = 'load_details';
    trip = route.params;

    useEffect(() => {
      dispatch(
        setBidInitialValue({amount: '', delivery_date: '', checked: false}),
      );
    }, []);
  } else if (route.params.booking_id && route.params.quotation_id) {
    screen_type = 'quotes_details';
    const {pending_trips} = useSelector(state => state.trips);
    const {pending_trip, is_trip_loading} = pending_trips;
    is_loading = is_trip_loading;
    trip = pending_trip;

    useEffect(() => {
      dispatch(getSinglePendingTrip({booking_id, quotation_id}))
        .unwrap()
        .then(trip => {
          // console.log('##_--->', trip.trips[0]);
          const {amount, delivery_date} = trip.trips[0]?.quotation;
          setPreBidAmount(amount);
          dispatch(
            setBidInitialValue({
              amount: amount,
              delivery_date: delivery_date,
              checked: true,
            }),
          );
        });
    }, []);
  }

  // ---------------------------
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [datePickerShow, setDatePickerShow] = useState(false); // date time modal show / hide state
  let isCloseQuoteSection = false;

  // let todayDate = moment(new Date()).format('DD/MM/YYYY');

  const {driver_count} = useSelector(state => state.driver);

  const {vehicle_count} = useSelector(state => state.vehicle);

  const today = new Date();

  const [initialDate, setInitialDate] = useState(today); // initial date

  if (trip?.quotation) {
    const {amount, delivery_date} = trip?.quotation;
    if (amount && delivery_date) {
      isCloseQuoteSection = false;
    }
  }

  const datePickerOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || initialDate;
    setDatePickerShow(Platform.OS === 'ios');
    setInitialDate(currentDate);

    const tempDate = new Date(currentDate);
    dispatch(setBidDeliveryDate(tempDate));
  };

  // alert -------------------------------------------------------------------------
  const [alertMessage, setAlertMessage] = useState({
    visible: false,
    title: '',
    message: '',
    apiSuccess: false,
  });

  const confirmLoad = () => {
    if (user.status === 'Pending') {
      setConfirmModalVisible(false);
      alert('Your KYC is not verified!');
    } else {
      dispatch(createBid({_id: trip?.load?._id, loader: trip?.load?.loader}))
        .unwrap()
        .then(() => {
          setConfirmModalVisible(false);
          setAlertMessage({
            visible: true,
            title: 'Bid Status',
            message: 'Your bid has been successfully placed',
            apiSuccess: true,
          });
        })
        .catch(e => {
          setAlertMessage({
            visible: true,
            title: '',
            message: e?.message || 'something were wrong',
            apiSuccess: false,
          });
        });
    }
  };

  const canBid = () => {
    if (isCloseQuoteSection) return;
    let message = '';
    if (driver_count?.verified <= 0 && vehicle_count?.verified <= 0) {
      message = "You don't have a verified driver and a vehicle";
      return (
        <View style={style.cantBidErrorContainer}>
          <Text style={style.cantBidError}>{message}</Text>
        </View>
      );
    }
    if (driver_count?.verified <= 0) {
      message = "You don't have a verified driver";
      return (
        <View style={style.cantBidErrorContainer}>
          <Text style={style.cantBidError}>{message}</Text>
        </View>
      );
    }
    if (vehicle_count?.verified <= 0) {
      message = "You don't have a verified vehicle";
      return (
        <View style={style.cantBidErrorContainer}>
          <Text style={style.cantBidError}>{message}</Text>
        </View>
      );
    }
  };

  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={
          screen_type === 'load_details'
            ? navigationStrings.LOAD_DETAILS
            : 'Bid Details'
        }
      />

      {is_loading && (
        <LoadingView
          container_style={{
            opacity: 0.5,
            marginTop: heightToDp(5.9),
            backgroundColor: colorStrings.WHITE_PRIMARY,
          }}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.container}>
        {/* --------- top header part  ---------------------------- */}

        {/* --------- vehicle and driver details  part  ---------------------------- */}

        <Card elevation={0} style={[style.cardSection]}>
          <Card>
            <View style={style.tripDetailsHeader}>
              <View>
                <Text style={globalStyles.mediumText}>Load Number</Text>
                <Text style={globalStyles.bigText}>{trip?.load?.load_no}</Text>
              </View>

              <View>
                <Text style={globalStyles.mediumText}> Created Date</Text>
                <Text style={[globalStyles.bigText, {alignSelf: 'flex-end'}]}>
                  {moment(trip?.load?.created_date).format(
                    constants.DATE_FORMATE,
                  )}
                </Text>
              </View>
            </View>

            <View style={[style.tripDetailsItem]}>
              <View>
                <Text style={globalStyles.bigText}>Material</Text>
              </View>
              <View style={globalStyles.flex_JA_center}>
                <Text style={globalStyles.bigText}>
                  {trip?.load?.material_type}
                </Text>
              </View>
            </View>

            <View style={[style.tripDetailsItem]}>
              <View>
                <Text style={globalStyles.bigText}>Pickup Date</Text>
              </View>
              <View style={globalStyles.flex_JA_center}>
                <Text style={globalStyles.bigText}>
                  {moment(trip?.load?.pickup_date).format(
                    constants.DATE_FORMATE,
                  )}
                </Text>
              </View>
            </View>

            <View style={[style.tripDetailsItem]}>
              <View>
                <Text style={globalStyles.bigText}>Expected Delivery Date</Text>
              </View>
              <View style={globalStyles.flex_JA_center}>
                <Text style={globalStyles.bigText}>
                  {moment(trip?.load?.expected_delivery_date).format(
                    constants.DATE_FORMATE,
                  )}
                </Text>
              </View>
            </View>
            <View style={[style.tripDetailsItem]}>
              <View>
                <Text style={globalStyles.bigText}>Vehicle</Text>
              </View>
              <View style={globalStyles.flex_JA_center}>
                <Text style={globalStyles.bigText}>
                  {trip?.load?.vehicle_type}
                </Text>
              </View>
            </View>

            <View style={[style.tripDetailsItem]}>
              <View>
                <Text style={globalStyles.bigText}>Weight</Text>
              </View>
              <View style={globalStyles.flex_JA_center}>
                <Text style={globalStyles.bigText}>
                  {trip?.load?.weight} MT
                </Text>
              </View>
            </View>
            <View style={[style.tripDetailsItem]}>
              <View>
                <Text style={globalStyles.bigText}>Consignment Insured</Text>
              </View>
              <View style={globalStyles.flex_JA_center}>
                <Text style={globalStyles.bigText}>
                  {trip?.load?.consignment_insured ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>
            {/* <View style={[style.tripDetailsItem]}>
              <View>
                <Text style={globalStyles.bigText}>Loader Rating</Text>
              </View>
              <View style={globalStyles.flex_JA_center}>
                <RatingStar rating={4} size={scale(4)} />
              </View>
            </View> */}
            <View
              style={[
                style.tripDetailsItem,
                {borderBottomWidth: 0, paddingBottom: 10},
              ]}>
              <View>
                <Text style={globalStyles.bigText}>Value Of Goods</Text>
              </View>
              <View style={globalStyles.flex_JA_center}>
                <Text style={globalStyles.bigText}>
                  {'\u20B9 '}
                  {trip?.load?.value}
                </Text>
              </View>
            </View>
          </Card>
        </Card>

        {/* --------- pick up address part  ---------------------------- */}

        <Card style={globalStyles.card}>
          <View style={globalStyles.flexRow}>
            <Icon name="map-marker" size={scale(5)} style={globalStyles.mr_1} />
            <Title style={{fontSize: size.COMPACT}}>Pick Up</Title>
          </View>
          <Text style={[globalStyles.mediumText, globalStyles.mt_2]}>
            {trip?.load?.pickup?.address}
          </Text>

          <View
            style={[globalStyles.flexRowSpaceBetween, {alignItems: 'center'}]}>
            <Text
              style={[
                globalStyles.bigText,
                {marginTop: heightToDp(1), fontFamily: fonts.CERA_BOLD},
              ]}>
              Contact Number :{' '}
              <Text style={[globalStyles.bigText]}>**********</Text>
            </Text>
            {/*<Icon*/}
            {/*  name="phone"*/}
            {/*  size={scale(5)}*/}
            {/*  onPress={() => Linking.openURL(`tel:${+pickup.contact_number}`)}*/}
            {/*/>*/}
          </View>
        </Card>

        {/* --------- delivery header part  ---------------------------- */}

        <Card style={globalStyles.card}>
          <View style={globalStyles.flexRow}>
            <Icon
              name="map-marker-multiple"
              size={scale(5)}
              style={globalStyles.mr_1}
            />
            <Title style={{fontSize: size.COMPACT}}>Delivery</Title>
          </View>
          <Text style={[globalStyles.bigText, globalStyles.mt_2]}>
            {trip?.load?.delivery?.address}
          </Text>

          <View
            style={[globalStyles.flexRowSpaceBetween, {alignItems: 'center'}]}>
            <Text
              style={[
                globalStyles.bigText,
                {
                  marginTop: heightToDp(1),
                  fontFamily: fonts.CERA_BOLD,
                },
              ]}>
              Contact Number :{' '}
              <Text style={[globalStyles.bigText]}>**********</Text>
            </Text>
            {/*<Icon*/}
            {/*  name="phone"*/}
            {/*  size={scale(5)}*/}
            {/*  onPress={() => Linking.openURL(`tel:${+pickup.contact_number}`)}*/}
            {/*/>*/}
          </View>
        </Card>
        {/* remark------------------------------------------------- */}
        <Card style={globalStyles.card}>
          <Title style={{fontSize: size.COMPACT}}>Remark</Title>
          <Text style={style.bigText}>{trip?.load?.remark}</Text>
        </Card>

        {canBid()}

        {!isCloseQuoteSection ? (
          <>
            <Card.Content style={style.quoteSection}>
              {preBidAmount && (
                <>
                  <View
                    style={[
                      style.tripDetailsItem,
                      {borderBottomWidth: 0, paddingBottom: 10},
                    ]}>
                    <View>
                      <Text style={globalStyles.bigText}>
                        Previous Quoted Amount
                      </Text>
                    </View>
                    <View style={globalStyles.flex_JA_center}>
                      <Text style={globalStyles.bigText}>
                        {'\u20B9 '}
                        {preBidAmount}
                      </Text>
                    </View>
                  </View>
                </>
              )}
              <Title>Your Quote</Title>
              <View style={[globalStyles.flexRowSpaceBetween]}>
                <TextInput
                  mode="flat"
                  // label="Amount"
                  placeholder="Amount"
                  keyboardType="number-pad"
                  // value={
                  //   bid.amount && bid.amount.toString() != ''
                  //     ? bid.amount.toString()
                  //     : null
                  // }
                  onChangeText={e => dispatch(setBidAmount(e))}
                  maxLength={6}
                  style={[
                    style.textInput,
                    globalStyles.mediumText,
                    {width: widthToDp(40), padding: 0},
                  ]}
                />
                <TouchableOpacity
                  style={style.selectDateButton}
                  onPress={() => setDatePickerShow(true)}>
                  <Icon
                    name="calendar-month"
                    color="black"
                    size={scale(5)}
                    style={globalStyles.mr_1}
                  />
                  <Text
                    style={[
                      globalStyles.mediumText,
                      {textAlignVertical: 'center'},
                    ]}>
                    {bid.delivery_date === null || bid.delivery_date === ''
                      ? 'Delivery Date'
                      : moment(bid.delivery_date).format(
                          constants.DATE_FORMATE,
                        )}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[globalStyles.flexRow, globalStyles.mt_4]}>
                <Checkbox
                  status={bid.checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    dispatch(setBidChecked(!bid?.checked));
                  }}
                />
                <Text style={[globalStyles.ml_1, globalStyles.smallText]}>
                  By continuing,{'\n'}you agree that you have read and accept
                  our
                  {'\n'}
                  <Text
                    style={style.textLink}
                    onPress={() =>
                      navigation.navigate(
                        navigationStrings.TERMS_AND_CONDITIONS_SCREEN,
                      )
                    }>
                    T&Cs and Privacy policy.
                  </Text>
                </Text>
              </View>
            </Card.Content>
            <Button
              disabled={
                driver_count?.verified <= 0 || vehicle_count?.verified <= 0
              }
              mode="contained"
              color={colorStrings.COLOR_PRIMARY}
              style={style.deleteButton}
              onPress={() => {
                if (
                  bid.amount == null ||
                  bid.amount.toString() == '' ||
                  bid.amount < 1
                ) {
                  setAlertMessage({
                    visible: true,
                    title: '',
                    message: 'Please enter bid amount.',
                    apiSuccess: false,
                  });
                } else if (
                  bid.delivery_date == null ||
                  bid.delivery_date == ''
                ) {
                  setAlertMessage({
                    visible: true,
                    title: 'Bid Status',
                    message: 'Please select delivery date',
                    apiSuccess: false,
                  });
                } else if (!bid.checked) {
                  setAlertMessage({
                    visible: true,
                    title: '',
                    message:
                      'Please select Terms & Conditions and Privacy policy',
                    apiSuccess: false,
                  });
                } else if (
                  bid.delivery_date > trip?.load?.expected_delivery_date
                ) {
                  // setAlertMessage({
                  //   visible: true,
                  //   title: '',
                  //   message:
                  //     'Bid delivery date should be same or before than expected delivery date',
                  //   apiSuccess: false,
                  // });
                } else {
                  setConfirmModalVisible(true);
                }
              }}>
              {screen_type === 'load_details' ? 'Send Bid' : 'Update Bid'}
            </Button>
          </>
        ) : (
          <Title
            style={{
              marginTop: heightToDp(3),
              color: colorStrings.COLOR_PRIMARY,
              textAlign: 'center',
            }}>
            The bidding has ended.
          </Title>
        )}
        <View style={{marginTop: heightToDp(25)}}></View>
      </ScrollView>

      {datePickerShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={initialDate}
          mode={'date'}
          // is24Hour={true}
          display="default"
          onChange={datePickerOnChange}
          minimumDate={today}
          maximumDate={moment(trip?.load?.expected_delivery_date)
            .add(0, 'days')
            .toDate()}
        />
      )}

      <Portal>
        <Dialog
          visible={confirmedModalVisible}
          onDismiss={() => setConfirmModalVisible(false)}>
          <ConfirmQuotation
            amount={bid?.amount}
            date={moment(bid?.delivery_date).format(constants.DATE_FORMATE)}
          />
          <Divider />
          <Button onPress={() => setConfirmModalVisible(false)}>Cancel</Button>
          <Button
            onPress={() => {
              confirmLoad();
            }}>
            Confirm & Send Quote
          </Button>
        </Dialog>
      </Portal>
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
          if (alertMessage.apiSuccess) {
            setAlertMessage({
              visible: false,
              title: '',
              message: '',
              apiSuccess: false,
            });
            navigation.navigate(navigationStrings.TRIPS, {
              screen: navigationStrings.QUOTATIONS,
              params: {
                reload: true,
              },
            });
          } else {
            setAlertMessage({
              visible: false,
              title: '',
              message: '',
              apiSuccess: false,
            });
          }
        }}
        onDismiss={() => {
          if (alertMessage.apiSuccess) {
            setAlertMessage({
              visible: false,
              title: '',
              message: '',
              apiSuccess: false,
            });
            navigation.navigate(navigationStrings.TRIPS, {
              screen: navigationStrings.QUOTATIONS,
              params: {
                reload: true,
              },
            });
          } else {
            setAlertMessage({
              visible: false,
              title: '',
              message: '',
              apiSuccess: false,
            });
          }
        }}
      />
    </>
  );
};

export default LoadDetails;
