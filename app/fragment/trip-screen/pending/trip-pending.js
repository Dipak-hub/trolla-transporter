import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {TripInquiryList} from '../../../component';
import style from './style';
import {heightToDp, scale} from '../../../utils';
import {globalStyles, size} from '../../../themes';
import {useSelector, useDispatch} from 'react-redux';
import {getPendingTrips} from '../../../store';
import {useNavigation} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
import {LoadingView} from '../../../component';

export const TripsEnquiry = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let loadFirstTime = useRef(0);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const {
    is_loading,
    is_more_loading,
    data: trip_data,
  } = useSelector(state => state.trips.pending_trips);
  const {trips} = trip_data;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      // console.log('pending focusesd');
      // console.log('--------------->', route.params);
      if (loadFirstTime.current === 0 || route.params?.reload) {
        if (route.params?.reload) route.params.reload = false;
        dispatch(getPendingTrips());
        // console.log('pending called');
      }
      loadFirstTime.current = loadFirstTime.current + 1;
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const renderList = ({item, index}) => (
    <>
      <TripInquiryList
        load={item?.load}
        loader={item?.loader}
        quotation={item?.quotation}
        trip_id={item?._id}
        key={index}
      />
      {/* to give some bottom margin to the last item list  */}
      {index == trips?.length - 1 && (
        <>
          {is_more_loading && (
            <ActivityIndicator
              animating={true}
              color={'blue'}
              size={scale(10)}
              style={{
                marginTop: heightToDp(8),
                backgroundColor: 'transparent',
              }}
            />
          )}
          <View style={{height: heightToDp(25)}}></View>
        </>
      )}
    </>
  );

  const onRefresh = async () => {
    setIsFetching(true);
    dispatch(getPendingTrips())
      .unwrap()
      .then(() => {
        setIsFetching(false);
        setPage(1);
      });
  };

  return (
    <SafeAreaView>
      {is_loading && !isFetching && <LoadingView />}

      {trips?.length === 0 ? (
        <Text
          style={{
            textAlign: 'center',
            fontSize: size.LARGE,
            marginBottom: heightToDp(10),
            marginTop: heightToDp(40),
          }}>
          You didn't bid any load yet ...
        </Text>
      ) : (
        <>
          <View style={style.container}>
            <Text style={[globalStyles.mediumText, globalStyles.mt_1]}>
              {' '}
              Total : {trip_data?.total}
            </Text>
            <FlatList
              data={trips}
              onRefresh={onRefresh}
              refreshing={isFetching}
              showsVerticalScrollIndicator={false}
              renderItem={renderList}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => {
                if (page < trip_data?.total_number_of_pages) {
                  // console.log('---------');
                  dispatch(getPendingTrips({page: page + 1}))
                    .unwrap()
                    .then(() => {
                      setPage(page + 1);
                    });
                }
              }}
              onEndReachedThreshold={0.5}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
export default TripsEnquiry;
