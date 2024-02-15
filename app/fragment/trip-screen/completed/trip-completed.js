import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, View, FlatList, AppState} from 'react-native';
import {ActivityIndicator, Chip, Text} from 'react-native-paper';
import {globalStyles, size} from '../../../themes';
import {heightToDp, scale} from '../../../utils';
import {CompletedTripList} from '../../../component';
import style from './style';
import {useSelector, useDispatch} from 'react-redux';
import {getCompletedTrips} from '../../../store';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
import {LoadingView} from '../../../component';
const TripCompleted = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    is_loading,
    is_more_loading,
    data: trip_data,
    error,
  } = useSelector(state => state.trips.completed_trips);

  const {trips} = trip_data;

  let loadFirstTime = useRef(0);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      // console.log('completed focusesd');
      if (loadFirstTime.current === 0) {
        dispatch(getCompletedTrips());
        // console.log('completed called');
      }
      loadFirstTime.current = loadFirstTime.current + 1;
    });

    return unsubscribe;
  }, [navigation]);

  const renderList = ({item, index}) => (
    <>
      <CompletedTripList trip={item} key={index} />

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
    dispatch(getCompletedTrips())
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
          You haven't completed any trip...
        </Text>
      ) : (
        <>
          <View style={style.container}>
            <Text style={[globalStyles.mediumText, globalStyles.mt_1]}>
              {' '}
              Total : {trip_data.total}
            </Text>
            <FlatList
              data={trips}
              onRefresh={onRefresh}
              refreshing={isFetching}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderList}
              onEndReached={() => {
                if (page < trip_data?.total_number_of_pages) {
                  dispatch(getCompletedTrips({page: page + 1}))
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
export default TripCompleted;
