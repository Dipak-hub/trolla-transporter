import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Button,
  Card,
  Text,
  IconButton,
  Subheading,
  List,
  Headline,
} from 'react-native-paper';
import style from './style';
import {HeaderComponent, LiveDirectionMap} from '../../component';
import {
  navigationStrings,
  colorStrings,
  mapType,
  constants,
  imagePath,
  statusTypes,
} from '../../constants';
import {scale, heightToDp} from '../../utils';
import {globalStyles} from '../../themes';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {getSingleTripDetail} from '../../store';
import moment from 'moment';

const DriverTripDetails = ({route}) => {
  const dispatch = useDispatch();
  const {driver_trip, loading, error} = useSelector(state => state.driver);
  const {load, quotation, loader, transporter, vehicle, driver} = driver_trip;
  useEffect(() => {
    dispatch(getSingleTripDetail(route.params));
  }, []);

  //   const balanceAmount =
  //     ((100 - constants.ADVANCE_PERCENT) / 100) * quotation?.amount;
  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.DRIVER_TRIPS_DETAILS}
      />
      {loading ? (
        <Text style={{textAlign: 'center', marginTop: 50}}>loading...</Text>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={globalStyles.container}>
            {/* --------- top header part  ---------------------------- */}
            <View style={style.topHeader}>
              <Text style={style.bigText}>Load No: {load?.load_no}</Text>

              <View style={style.topHeaderRight}>
                <Text style={style.topHeaderRightText}>Status</Text>
                <Text style={style.topHeaderRightStatus}>
                  {driver_trip?.status}
                </Text>
              </View>
            </View>

            {/* --------- pay remaining balance part  ---------------------------- */}
            {driver_trip?.status === statusTypes.COMPLETE && (
              <Card style={style.payBalanceSec}>
                <Text style={[globalStyles.bigText, {textAlign: 'center'}]}>
                  Paid amount
                </Text>
                <Headline style={{alignSelf: 'center'}}>
                  {'\u20B9 '}
                  {driver_trip?.values?.confirmation_details?.amount || 0}
                </Headline>
                <Text style={[globalStyles.bigText, {textAlign: 'center'}]}>
                  Remaining Balance
                </Text>
                <Headline style={{alignSelf: 'center'}}>
                  {'\u20B9 '}
                  {driver_trip?.values?.closed_details?.amount || 0}
                </Headline>
              </Card>
            )}
            {driver_trip?.status === statusTypes.CLOSE && (
              <Card style={style.payBalanceSec}>
                <Text style={[globalStyles.bigText, {textAlign: 'center'}]}>
                  Amount Received
                </Text>
                <Headline
                  style={{
                    alignSelf: 'center',
                  }}>
                  Rs.{' '}
                  {driver_trip?.values?.confirmation_details?.amount +
                    driver_trip?.values?.closed_details?.amount}
                </Headline>
              </Card>
            )}
            {/* --------- Proof of Delivery  part  ---------------------------- */}
            <ProofOfDelivery
              invoice={driver_trip?.documents?.invoice}
              eWayBill={driver_trip.documents?.e_way_bill}
              weightSlip={driver_trip.documents?.weight_slip}
              loadReceipt={driver_trip.documents?.load_receipt}
            />
            {/* --------- vehicle and driver details  part  ---------------------------- */}
            <VehicleAndDriverDetails
              load={load}
              loader={loader}
              vehicle={vehicle}
              driver={driver}
              quotation={quotation}
            />
            {/* load details -------------------------------------------------------------- */}
            <LoadDetails load={load} />
            {/* --------- remark part  ---------------------------- */}
            <Card style={style.pickup}>
              <Subheading style={globalStyles.largeText}>Remark</Subheading>
              <Text style={globalStyles.bigText}>{load?.remark}</Text>
            </Card>
            {/*<Card*/}
            {/*  style={[style.pickup, {paddingHorizontal: 5, marginBottom: 50}]}>*/}
            {/*  <Subheading style={globalStyles.largeText}>*/}
            {/*    Location History*/}
            {/*  </Subheading>*/}
            {/*  <View style={style.mapContainer}>*/}
            {/*    <Card.Cover*/}
            {/*      source={imagePath.MAP_TIMELINE}*/}
            {/*      // style={style.documentImage}*/}
            {/*      resizeMode="stretch"*/}
            {/*    />*/}
            {/*    /!* <LiveDirectionMap*/}
            {/*  pickup={locationData.pickup}*/}
            {/*  delivery={locationData.delivery}*/}
            {/*  mapType={mapType.DIRECTION}*/}
            {/*/> *!/*/}
            {/*  </View>*/}
            {/*</Card>*/}
            <View style={{height: heightToDp(25)}} />
          </ScrollView>
        </>
      )}
    </>
  );
};

const ProofOfDelivery = ({weightSlip, eWayBill, loadReceipt, invoice}) => {
  return (
    <Card style={style.cardSection}>
      <List.Accordion
        title="Proof of Delivery "
        titleStyle={globalStyles.bigText}
        style={style.accordionSize}>
        <Card elevation={0} style={style.pickup}>
          <Text style={(globalStyles.bigText, globalStyles.mb_1)}>
            E Wai Bill
          </Text>
          {eWayBill ? (
            <Card.Cover
              source={{
                uri: eWayBill,
              }}
              style={style.documentImage}
              resizeMode="stretch"
            />
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
            <Card.Cover
              source={{
                uri: loadReceipt,
              }}
              style={style.documentImage}
              resizeMode="stretch"
            />
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
            <Card.Cover
              source={{
                uri: weightSlip,
              }}
              style={style.documentImage}
              resizeMode="stretch"
            />
          ) : (
            <Text style={style.document_not_uploader_message}>
              Not uploaded
            </Text>
          )}
        </Card>

        <Card elevation={0} style={style.pickup}>
          <Text style={(globalStyles.bigText, globalStyles.mb_1)}>Invoice</Text>
          {invoice ? (
            <Card.Cover
              source={{
                uri: invoice,
              }}
              style={style.documentImage}
              resizeMode="stretch"
            />
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

const VehicleAndDriverDetails = ({
  load,
  quotation,
  loader,
  driver,
  vehicle,
}) => {
  return (
    <Card style={style.cardSection}>
      <List.Accordion
        title="Vehicle and Driver Details"
        titleStyle={globalStyles.bigText}
        style={style.accordionSize}>
        <Card elevation={0} style={style.tripDetails}>
          <View style={style.tripDetailsHeader}>
            {/* <View>
              <Text style={globalStyles.bigText}>Load#</Text>
              <Text style={globalStyles.largeText}>74</Text>
            </View> */}
            <View>
              <Text style={globalStyles.bigText}>Created Date</Text>
              <Text style={globalStyles.largeText}>
                {moment(load?.created_date).format(constants.DATE_FORMATE)}
              </Text>
            </View>
            <View>
              <Text style={globalStyles.bigText}>Delivery Date</Text>
              <Text style={globalStyles.largeText}>
                {moment(quotation?.delivery_date).format(
                  constants.DATE_FORMATE,
                )}
              </Text>
            </View>
          </View>

          {/* <View style={[style.tripDetailsItem]}>
            <View>
              <Text style={globalStyles.bigText}>Trip</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={globalStyles.bigText}>Guwahati</Text>
              <IconButton
                icon="map-marker-distance"
                color="black"
                size={scale(5)}
              />
              <Text style={globalStyles.bigText}>Shilong</Text>
            </View>
          </View> */}

          <View style={[style.tripDetailsItem]}>
            <View>
              <Text style={globalStyles.bigText}>Loader Name</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={globalStyles.bigText}>{loader?.user_name}</Text>
            </View>
          </View>
          <View style={[style.tripDetailsItem]}>
            <View>
              <Text style={globalStyles.bigText}>Loader Contact No</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={globalStyles.bigText}>{loader?.mobile_primary}</Text>
            </View>
          </View>
          <View style={[style.tripDetailsItem]}>
            <View>
              <Text style={globalStyles.bigText}>Vehicle No</Text>
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
          <View style={[style.tripDetailsItem]}>
            <View>
              <Text style={globalStyles.bigText}>Driver Name</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={globalStyles.bigText}>{driver?.user_name}</Text>
            </View>
          </View>
          <View
            style={[
              style.tripDetailsItem,
              {borderBottomWidth: 0, paddingBottom: 10},
            ]}>
            <View>
              <Text style={globalStyles.bigText}>Driver Contact No</Text>
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
        </Card>
      </List.Accordion>
    </Card>
  );
};

const LoadDetails = ({load}) => {
  return (
    <Card style={style.cardSection}>
      <List.Accordion
        title="Load details "
        titleStyle={globalStyles.bigText}
        style={style.accordionSize}>
        <Card elevation={0} style={style.pickup}>
          <Subheading style={globalStyles.largeText}>Pick Up</Subheading>
          <Text style={globalStyles.bigText}>{load?.pickup?.address}</Text>
        </Card>

        <Card elevation={0} style={style.pickup}>
          <Subheading style={globalStyles.largeText}>Delivery</Subheading>
          <Text style={globalStyles.bigText}>{load?.delivery?.address}</Text>
        </Card>

        {/* --------- description of goods ---------------------------- */}

        <Card elevation={0} style={style.tripDetails}>
          <View style={[style.tripDetailsItem]}>
            <View>
              <Text style={style.bigText}>Weight</Text>
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

          <View style={[style.tripDetailsItem]}>
            <View>
              <Text style={globalStyles.bigText}>Value of the Goods</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={globalStyles.bigText}>
                {'\u20B9 '}
                {load?.value}
              </Text>
            </View>
          </View>

          <View
            style={[
              style.tripDetailsItem,
              {borderBottomWidth: 0, marginBottom: 10},
            ]}>
            <View>
              <Text style={globalStyles.bigText}>Consignment Insured</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={globalStyles.bigText}>
                {load?.consignment_insured ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
        </Card>
      </List.Accordion>
    </Card>
  );
};

export default DriverTripDetails;
