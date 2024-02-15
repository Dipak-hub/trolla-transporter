import React, {useState, useEffect, useRef, useCallback} from 'react';
import {HeaderComponent, LoadingView} from '../../component';
import {navigationStrings} from '../../constants';
import {SafeAreaView, View, FlatList, AppState} from 'react-native';
import {ActivityIndicator, Chip, Text} from 'react-native-paper';
import {globalStyles, size} from '../../themes';
import {heightToDp, scale} from '../../utils';
import {DriverTripList} from '../../component/index';
import style from './style';
import {useSelector, useDispatch} from 'react-redux';
import {getDriverTrips} from '../../store';
import {useNavigation} from '@react-navigation/core';

const DriverTrips = ({route}) => {
  const {_id} = route.params;
  const dispatch = useDispatch();

  const {
    is_loading,
    is_more_loading,
    data: driver_trips_data,
    error,
  } = useSelector(state => state.driver.driver_trips);

  const {trips} = driver_trips_data;

  let loadFirstTime = useRef(0);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getDriverTrips({id: _id}));
  }, []);

  // useEffect(() => {
  //   setIsFetching(false);
  // }, [trips]);

  // const haveData = trips.length !== 0;
  // let haveData = true;
  const renderList = ({item, index}) => (
    <>
      <DriverTripList trip={item} key={index} />

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
    dispatch(getDriverTrips(_id))
      .unwrap()
      .then(() => {
        setIsFetching(false);
        setPage(1);
      });
  };

  return (
    <SafeAreaView>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.DRIVER_TRIPS}
      />

      {is_loading && !isFetching && <LoadingView />}

      {trips.length !== 0 ? (
        <Text
          style={{
            textAlign: 'center',
            fontSize: size.LARGE,
            marginBottom: heightToDp(10),
            marginTop: heightToDp(40),
          }}>
          No trips yet.
        </Text>
      ) : (
        <>
          <View style={style.container}>
            <Text style={[globalStyles.mediumText]}>
              {' '}
              Total : {driver_trips_data.total || 0}
            </Text>

            <FlatList
              data={trips}
              onRefresh={onRefresh}
              refreshing={isFetching}
              showsVerticalScrollIndicator={false}
              renderItem={renderList}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => {
                if (page < driver_trips_data?.total_number_of_pages) {
                  dispatch(getDriverTrips({id: _id, page: page + 1}))
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

export default DriverTrips;
