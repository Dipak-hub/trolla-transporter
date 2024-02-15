import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';

import style from './style';
import {ConfirmedTripList} from '../../../component';
import {heightToDp, scale, widthToDp} from '../../../utils';
import {globalStyles, size} from '../../../themes';
import {useSelector, useDispatch} from 'react-redux';
import {getConfirmedTrips} from '../../../store';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {LoadingView} from '../../../component';
import {colorStrings} from '../../../constants';

const TripsConfirmed = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    is_loading,
    is_more_loading,
    data: trip_data,
    error,
  } = useSelector(state => state.trips.confirmed_trips);

  const {trips} = trip_data;

  let loadFirstTime = useRef(0);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', e => {
      if (loadFirstTime.current === 0) {
        dispatch(getConfirmedTrips());
      }
      loadFirstTime.current = loadFirstTime.current + 1;
    });

    return unsubscribe;
  }, [navigation]);

  const renderList = ({item, index}) => (
    <>
      <ConfirmedTripList trip={item} key={index} />
      {/* to give some bottom margin to the last item of list  */}
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
          <View
            style={{
              height: heightToDp(25),
            }}></View>
        </>
      )}
    </>
  );

  const onRefresh = async () => {
    setIsFetching(true);
    dispatch(getConfirmedTrips())
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
          You didn't have any confirmed trip ...
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
                  dispatch(getConfirmedTrips({page: page + 1}))
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
export default TripsConfirmed;
