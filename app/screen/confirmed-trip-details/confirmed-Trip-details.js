import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Card,
  Text,
  IconButton,
  Subheading,
  List,
  Appbar,
  Headline,
} from 'react-native-paper';
import style from './style';
import {
  CustomCardButton,
  HeaderComponent,
  LiveDirectionMap,
  LoadingView,
  RatingStar,
} from '../../component';
import {
  navigationStrings,
  colorStrings,
  mapType,
  statusTypes,
  iconPath,
  constants,
} from '../../constants';
import {coordinateToAddress, heightToDp, scale, widthToDp} from '../../utils';
import {globalStyles} from '../../themes';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {
  clearAssign,
  getSingleConfirmedTrip,
  removeVehicleAndDriver,
  setVehicleAndDriver,
} from '../../store';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const ConfirmedTripsDetails = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {confirmed_trips, loading, error} = useSelector(state => state.trips);

  const {
    confirmed_trip: trip,
    is_trip_loading: is_loading,
    is_set_vehicle_and_driver_loading,
  } = confirmed_trips;

  const tripId = route.params;

  useEffect(() => {
    dispatch(getSingleConfirmedTrip(tripId));
  }, []);

  // alert -------------------------------------------------------------------------
  const [alertMessage, setAlertMessage] = useState({
    visible: false,
    title: '',
    message: '',
    apiSuccess: false,
  });

  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.CONFIRMED_TRIPS_DETAILS}
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
        <TopStatusBar
          delivery_date={moment(trip?.quotation?.delivery_date).format(
            constants.DATE_FORMATE,
          )}
          status={trip?.status}
          load_no={trip?.load?.load_no}
        />

        {(trip?.status === 'Confirmed' || trip?.status === 'Assigned') && (
          <>
            {/* assign vehicle and driver -------------------------------------------------------- */}
            <Card style={style.cardSection}>
              {!trip?.driver &&
                !trip?.vehicle &&
                (trip?.status === 'Confirmed' ||
                  trip?.status === 'Assigned') && (
                  <Subheading style={globalStyles.largeText}>
                    Assign Vehicle and Driver
                  </Subheading>
                )}
              {trip?.driver &&
                trip?.vehicle &&
                trip?.status === statusTypes.CONFIRMED && (
                  <Subheading style={[globalStyles.largeText, {color: 'red'}]}>
                    Press save to confirm the vehicle and driver
                  </Subheading>
                )}
              {trip?.driver &&
                trip?.vehicle &&
                trip?.status === statusTypes.ASSIGNED && (
                  <Subheading
                    style={[
                      globalStyles.mediumText,
                      {color: colorStrings.COLOR_PRIMARY_BLUE},
                    ]}>
                    Driver and vehicle assigned. If you want to remove or
                    reassign press the cancel button.
                  </Subheading>
                )}

              {is_set_vehicle_and_driver_loading && (
                <ActivityIndicator size={'large'} color="tomato" />
              )}

              <View
                style={[globalStyles.flexRowSpaceBetween, globalStyles.mt_2]}>
                {trip?.driver !== undefined || (
                  <>
                    <TouchableOpacity
                      style={style.selectDriverVehicleButton}
                      onPress={() =>
                        navigation.navigate(navigationStrings.DRIVERS, {
                          pick: true,
                        })
                      }>
                      <Image
                        style={style.selectDriverVehicleButtonImage}
                        source={iconPath.DRIVER}
                      />
                      <Text style={{color: colorStrings.WHITE_PRIMARY}}>
                        {' '}
                        Select Driver
                      </Text>
                    </TouchableOpacity>
                    <View style={{width: widthToDp(2)}}></View>
                  </>
                )}

                {trip?.vehicle !== undefined || (
                  <TouchableOpacity
                    style={style.selectDriverVehicleButton}
                    onPress={() =>
                      navigation.navigate(navigationStrings.VEHICLES, {
                        pick: true,
                      })
                    }>
                    <Image
                      style={style.selectDriverVehicleButtonImage}
                      source={iconPath.TRUCK}
                    />
                    <Text style={{color: colorStrings.WHITE_PRIMARY}}>
                      {' '}
                      Select Vehicle
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </Card>
            {trip?.driver !== undefined &&
              trip?.vehicle !== undefined &&
              (trip?.status === 'Confirmed' || trip?.status === 'Assigned') && (
                <View
                  style={[
                    globalStyles.flexRow,
                    {
                      justifyContent: 'space-around',
                      marginTop: heightToDp(2),
                    },
                  ]}>
                  <CustomCardButton
                    title="Save"
                    disabled={is_loading}
                    titleColor={colorStrings.SNOW_WHITE}
                    onPress={() => {
                      dispatch(setVehicleAndDriver(tripId))
                        .unwrap()
                        .then(() => {
                          setAlertMessage({
                            visible: true,
                            title: '',
                            message: 'Driver and Vehicle assigned to the trip',
                            apiSuccess: true,
                          });
                        })
                        .catch(e => {
                          setAlertMessage({
                            visible: true,
                            title: '',
                            message: e.message,
                            apiSuccess: false,
                          });
                        });
                    }}
                    styles={{
                      height: heightToDp(5),
                      width: widthToDp(45),
                      padding: 0,
                      backgroundColor: !loading
                        ? colorStrings.SUCCESS
                        : colorStrings.DARK_GRAY,
                      borderColor: !loading
                        ? '#4cae4c'
                        : colorStrings.DARK_GRAY,
                      borderWidth: 2,
                      borderRadius: 4,
                    }}
                    textStyle={{fontSize: scale(5)}}
                  />
                  <CustomCardButton
                    title="Cancel"
                    disabled={loading}
                    titleColor={colorStrings.SNOW_WHITE}
                    onPress={() => {
                      // dispatch(clearAssign());
                      dispatch(removeVehicleAndDriver(tripId))
                        .unwrap()
                        .then(() => {
                          setAlertMessage({
                            visible: true,
                            title: '',
                            message: 'Driver and Vehicle removed from the trip',
                            apiSuccess: true,
                          });
                        })
                        .catch(e => {
                          setAlertMessage({
                            visible: true,
                            title: '',
                            message: e.message,
                            apiSuccess: false,
                          });
                        });
                    }}
                    styles={{
                      height: heightToDp(5),
                      width: widthToDp(45),
                      padding: 0,
                      backgroundColor: !is_loading
                        ? colorStrings.SUCCESS
                        : colorStrings.DARK_GRAY,
                      borderColor: !is_loading
                        ? '#4cae4c'
                        : colorStrings.DARK_GRAY,
                      borderWidth: 2,
                      borderRadius: 4,
                    }}
                    textStyle={{fontSize: scale(5)}}
                  />
                </View>
              )}
          </>
        )}

        {/* assign driver details  -------------------------------------------------------- */}
        {trip?.driver === undefined || trip?.driver === null || (
          <DriverDetails
            driver={trip?.driver}
            navigation={navigation}
            confirmed_trip={trip}
          />
        )}
        {/* assign vehicle details details  -------------------------------------------------------- */}
        {trip?.vehicle === undefined || trip?.vehicle === null || (
          <VehicleDetails
            vehicle={trip?.vehicle}
            navigation={navigation}
            confirmed_trip={trip}
          />
        )}

        {/* payment details ----------------------------------------------------- */}
        <Card style={style.payBalanceSec}>
          <Text style={[globalStyles.bigText, {textAlign: 'center'}]}>
            Amount Received
          </Text>
          <Headline
            style={{
              alignSelf: 'center',
            }}>
            {'\u20B9 '}
            {trip?.values?.confirmation_details?.amount || 0}
          </Headline>
        </Card>

        {/* --------------------- Loader  and load details  part ----------------------------------*/}
        <LoaderAndLoadDetails
          loader={trip?.loader}
          quotation={trip?.quotation}
          load={trip?.load}
          confirmed_trip={trip}
        />

        {/* location tracking ----------------------------------------- */}
        {trip?.status !== statusTypes.ASSIGNED &&
          trip?.vehicle?.gps?.latitude !== null &&
          trip?.vehicle?.gps?.longitude != null && (
            <LocationTracking navigation={navigation} confirmed_trip={trip} />
          )}

        <Card style={style.cardSection}>
          <Subheading style={globalStyles.largeText}>Pick Up</Subheading>
          <Text style={globalStyles.bigText}>
            {trip?.load?.pickup?.consignor}
          </Text>
          <Text style={globalStyles.bigText}>
            {trip?.load?.pickup?.address}
          </Text>
          <Text style={globalStyles.bigText}>
            Mobile : {trip?.load?.pickup?.contact_number}
          </Text>
        </Card>

        {/* --------- delivery header part  ---------------------------- */}

        <Card style={style.cardSection}>
          <Subheading style={globalStyles.largeText}>Delivery</Subheading>
          <Text style={globalStyles.bigText}>
            {trip?.load?.delivery?.consignee}
          </Text>
          <Text style={globalStyles.bigText}>
            {trip?.load?.delivery?.address}
          </Text>
          <Text style={globalStyles.bigText}>
            Mobile : {trip?.load?.delivery?.contact_number}
          </Text>
        </Card>

        {/* --------- remark part  ---------------------------- */}

        <Card style={style.cardSection}>
          <Subheading style={globalStyles.largeText}>Remark</Subheading>
          <Text style={globalStyles.bigText}>{trip?.load?.remark}</Text>
        </Card>

        {/* --------- Proof of Delivery  part  ---------------------------- */}
        <ProofOfDelivery
          invoice={trip?.documents?.invoice}
          eWayBill={trip?.documents?.e_way_bill}
          weightSlip={trip?.documents?.weight_slip}
          loadReceipt={trip?.documents?.load_receipt}
        />

        <View style={{marginTop: heightToDp(25)}}></View>

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
            if (alertMessage.apiSuccess) {
              setAlertMessage({
                visible: false,
                title: '',
                message: '',
                apiSuccess: false,
              });
              // navigation.goBack();
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
      </ScrollView>
    </>
  );
};

const DriverDetails = ({driver, navigation, confirmed_trip}) => {
  return (
    <Card
      style={[
        style.tripDetails,
        {
          paddingTop: 0,
          marginBottom: heightToDp(1),
          backgroundColor: '#f1faff',
        },
      ]}>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'yellow',
          flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <Image
            style={style.driverAndVehicleDetailsImage}
            source={iconPath.DRIVER}
          />

          <Subheading
            style={[
              globalStyles.largeText,
              globalStyles.mb_2,
              globalStyles.ml_2,
              globalStyles.mt_2,
            ]}>
            Driver Details
          </Subheading>
        </View>
        {/* <Text style={{alignSelf: 'flex-end'}}>hello</Text> */}

        {confirmed_trip?.driver !== undefined &&
          confirmed_trip?.vehicle !== undefined &&
          (confirmed_trip?.status === 'Confirmed' ||
            confirmed_trip?.status === 'Assigned') && (
            <TouchableOpacity
              style={style.changeDriverVehicleButton}
              onPress={() =>
                navigation.navigate(navigationStrings.DRIVERS, {
                  pick: true,
                })
              }>
              <Image
                style={style.changeDriverVehicleButtonImage}
                source={iconPath.DRIVER}
              />
              <Text style={{color: colorStrings.WHITE_PRIMARY}}>
                {' '}
                Change Driver
              </Text>
            </TouchableOpacity>
          )}
      </View>
      <View style={style.tripDetailsItem}>
        <View>
          <Text style={[globalStyles.bigText]}>Name:</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[globalStyles.bigText, globalStyles.ml_3]}>
            {driver?.user_name}
          </Text>
        </View>
      </View>
      <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>Mobile:</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>{driver?.mobile_primary}</Text>
        </View>
      </View>
      <View style={[style.tripDetailsItem, {borderBottomWidth: 0}]}>
        <View>
          <Text style={globalStyles.bigText}>Address:</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>{driver?.address}</Text>
        </View>
      </View>
    </Card>
  );
};

const VehicleDetails = ({vehicle, navigation, confirmed_trip}) => {
  return (
    <Card
      style={[
        style.tripDetails,
        {
          paddingTop: 0,
          marginBottom: heightToDp(1),
          backgroundColor: '#f1faff',
        },
      ]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
          }}>
          <Image
            style={style.driverAndVehicleDetailsImage}
            source={iconPath.TRUCK}
          />
          <Subheading
            style={[
              globalStyles.largeText,
              globalStyles.mb_2,
              globalStyles.ml_2,
              globalStyles.mt_2,
            ]}>
            Vehicle Details
          </Subheading>
        </View>

        {confirmed_trip?.driver !== undefined &&
          confirmed_trip?.vehicle !== undefined &&
          (confirmed_trip?.status === 'Confirmed' ||
            confirmed_trip?.status === 'Assigned') && (
            <TouchableOpacity
              style={style.changeDriverVehicleButton}
              onPress={() =>
                navigation.navigate(navigationStrings.VEHICLES, {
                  pick: true,
                })
              }>
              <Image
                style={style.changeDriverVehicleButtonImage}
                source={iconPath.TRUCK}
              />
              <Text style={{color: colorStrings.WHITE_PRIMARY}}>
                {' '}
                Change Vehicle
              </Text>
            </TouchableOpacity>
          )}
      </View>
      <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>Registration Number</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>{vehicle?.rc_number}</Text>
        </View>
      </View>
      <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>Vehicle Owner</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>{vehicle?.owner_name}</Text>
        </View>
      </View>
      <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>Wheels</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>{vehicle?.wheels}</Text>
        </View>
      </View>
      <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>Load Capacity</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>{vehicle?.load_capacity}</Text>
        </View>
      </View>
      <View style={[style.tripDetailsItem, {borderBottomWidth: 0}]}>
        <View>
          <Text style={globalStyles.bigText}>Body Type</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>{vehicle?.body_type}</Text>
        </View>
      </View>
    </Card>
  );
};

const TopStatusBar = ({load_no, delivery_date, status}) => {
  return (
    <View style={style.topHeader}>
      <View style={{alignItems: 'center'}}>
        <Text style={globalStyles.bigText}>Load No</Text>
        <Text style={globalStyles.bigText}>{load_no}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={globalStyles.bigText}>Delivery date </Text>
        <Text style={globalStyles.bigText}>{delivery_date}</Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={style.topHeaderRightText}>Status</Text>
        <Text style={style.topHeaderRightStatus}>{status}</Text>
      </View>
    </View>
  );
};

const LoaderAndLoadDetails = ({load, quotation, loader, confirmed_trip}) => {
  return (
    <Card
      style={[style.tripDetails, {paddingTop: 0, marginBottom: heightToDp(1)}]}>
      <View style={style.tripDetailsHeader}>
        <View>
          <Text style={globalStyles.bigText}>Loader Details</Text>
          <Text style={[globalStyles.largeText, {marginTop: heightToDp(1)}]}>
            {loader?.user_name}
          </Text>

          {/* <RatingStar rating={4} size={scale(5)} /> */}
        </View>
        {/* <View>
          <Text style={globalStyles.bigText}>SLA</Text>
          <Text style={[globalStyles.largeText, {marginTop: heightToDp(1)}]}>
            1 Days
          </Text>
        </View> */}
        <View>
          <Text style={globalStyles.bigText}>Balance Amount</Text>
          <Text
            style={{
              fontWeight: 'bold',
              marginTop: 6,
              alignSelf: 'flex-end',
            }}>
            {'\u20B9 '}
            {confirmed_trip?.values?.closed_details?.amount || 0}
          </Text>
        </View>
      </View>
      <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>Total Deal Amount</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>
            {'\u20B9 '}
            {quotation?.amount}
          </Text>
        </View>
      </View>
      <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>Material</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>{load?.material_type}</Text>
        </View>
      </View>

      <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>Weight of the Consignment</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>{load?.weight} MT</Text>
        </View>
      </View>

      <View style={[style.tripDetailsItem, {borderBottomWidth: 0}]}>
        <View>
          <Text style={globalStyles.bigText}>Value of The Goods</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>
            {' '}
            {'\u20B9 '}
            {load?.value}
          </Text>
        </View>
      </View>
      {/* <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>Expected Delivery Date</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>7 Oct 2021</Text>
        </View>
      </View> */}
      {/*
      <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>prefer Vehicle</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>Tempo</Text>
        </View>
      </View> */}
      {/* <View style={[style.tripDetailsItem]}>
        <View>
          <Text style={globalStyles.bigText}>prefer Tyre</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>12/16</Text>
        </View>
      </View> */}
      {/* <View style={[style.tripDetailsItem, {borderBottomWidth: 0}]}>
        <View>
          <Text style={globalStyles.bigText}>prefer Body Type</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={globalStyles.bigText}>Open</Text>
        </View>
      </View> */}
    </Card>
  );
};

const LocationTracking = ({navigation, confirmed_trip}) => {
  const [lastLocation, setLastLocation] = useState('');

  const getLocation = async ({latitude, longitude}) => {
    if (latitude && longitude) {
      const lastLocation = await coordinateToAddress(latitude, longitude);
      setLastLocation(lastLocation);
    }
  };

  useEffect(() => {
    if (confirmed_trip?.vehicle?.gps) {
      getLocation(confirmed_trip?.vehicle?.gps);
    }
  }, [confirmed_trip]);

  let lastLocationTimeDateTime = moment
    .utc(confirmed_trip?.vehicle?.updatedAt)
    // .local()
    .format('Do MMM hh:mm a');
  // console.log('lastLocationTimeDateTime--', lastLocationTimeDateTime);

  let lastLocationDate = moment
    .utc(confirmed_trip?.vehicle?.updatedAt)
    .local()
    .format('D MMM');
  // console.log('lastLocationDate--', lastLocationDate);
  let lastLocationTime = moment
    .utc(confirmed_trip?.vehicle?.updatedAt)
    .local()
    .format('hh:mm a');

  const today = moment().format('D MMM');
  let locationTime = '';

  locationTime =
    lastLocationDate === today
      ? `Today at ${lastLocationTime}`
      : lastLocationTimeDateTime;
  return (
    <Card
      style={[
        style.pickup,
        {
          paddingHorizontal: widthToDp(3),
          paddingVertical: heightToDp(3),
          marginBottom: 0,
          backgroundColor: colorStrings.GAINSBORO,
        },
      ]}>
      <Subheading style={globalStyles.largeText}>Location Tracking</Subheading>

      <View style={globalStyles.flexRow}>
        <Icon
          name="map-marker"
          color={colorStrings.BLACK_PRIMARY}
          size={scale(5)}
          style={[globalStyles.mt_1, globalStyles.mr_1]}
        />
        <Text
          style={[
            globalStyles.mediumText,
            globalStyles.mr_4,
            {color: 'green'},
          ]}>
          {lastLocation || 'Location will be available once trip is started'}
        </Text>
      </View>

      <View style={[globalStyles.flexRow, globalStyles.mt_2]}>
        <Icon
          name="clock-time-eight-outline"
          color={colorStrings.BLACK_PRIMARY}
          size={scale(5)}
          style={globalStyles.zero}
        />
        {Boolean(lastLocation) ? (
          <Text style={globalStyles.mediumText}> {locationTime}</Text>
        ) : (
          <Text style={globalStyles.mediumText}> Waiting for location</Text>
        )}
      </View>
      <TouchableOpacity
        style={[globalStyles.flexRow, globalStyles.mt_2]}
        onPress={() => {
          navigation.navigate(navigationStrings.TRACKING_SCREEN);
        }}>
        <Icon
          name="crosshairs-gps"
          color={colorStrings.BLACK_PRIMARY}
          size={scale(5)}
          style={globalStyles.zero}
        />

        {/* <IconButton
          icon="crosshairs-gps"
          size={25}
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            navigation.navigate(navigationStrings.TRACKING_SCREEN);
          }}
        /> */}
        <Text style={globalStyles.mediumText}> View in map</Text>
      </TouchableOpacity>

      {/* <View style={style.mapContainer}>
        <LiveDirectionMap mapType={mapType.LIVE_MAP} />
        </View>*/}
    </Card>
  );
};

const ProofOfDelivery = ({weightSlip, eWayBill, loadReceipt, invoice}) => {
  const navigation = useNavigation();
  return (
    <Card style={style.cardSection}>
      <List.Accordion
        title="Documents (Proof of Delivery)"
        titleStyle={globalStyles.bigText}
        style={style.accordionSize}>
        <Card elevation={0} style={style.pickup}>
          <Text style={(globalStyles.bigText, globalStyles.mb_1)}>
            E Way Bill
          </Text>
          {eWayBill ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.DOC_VIEWER, eWayBill)
              }>
              <Card.Cover
                source={{
                  uri: eWayBill,
                }}
                style={style.documentImage}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          ) : (
            <Text style={style.document_not_uploader_message}>
              Not uploaded
            </Text>
          )}
        </Card>

        <Card elevation={0} style={style.pickup}>
          <Text style={(globalStyles.bigText, globalStyles.mb_1)}>
            Load Receipt
          </Text>
          {loadReceipt ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.DOC_VIEWER, loadReceipt)
              }>
              <Card.Cover
                source={{
                  uri: loadReceipt,
                }}
                style={style.documentImage}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          ) : (
            <Text style={style.document_not_uploader_message}>
              Not uploaded
            </Text>
          )}
        </Card>

        <Card elevation={0} style={style.pickup}>
          <Text style={(globalStyles.bigText, globalStyles.mb_1)}>
            Weight Slip
          </Text>
          {weightSlip ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.DOC_VIEWER, weightSlip)
              }>
              <Card.Cover
                source={{
                  uri: weightSlip,
                }}
                style={style.documentImage}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          ) : (
            <Text style={style.document_not_uploader_message}>
              Not uploaded
            </Text>
          )}
        </Card>

        <Card elevation={0} style={style.pickup}>
          <Text style={(globalStyles.bigText, globalStyles.mb_1)}>Invoice</Text>
          {invoice ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.DOC_VIEWER, invoice)
              }>
              <Card.Cover
                source={{
                  uri: invoice,
                }}
                style={style.documentImage}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          ) : (
            <Text style={style.document_not_uploader_message}>
              Not uploaded
            </Text>
          )}
        </Card>
      </List.Accordion>
    </Card>
  );
};

export default ConfirmedTripsDetails;
