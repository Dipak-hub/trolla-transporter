import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {HeaderComponent, LoadingView, VehicleList} from '../../component';
import style from './style';
import {ActivityIndicator, Appbar, Button, TextInput} from 'react-native-paper';
import {navigationStrings} from '../../constants';
import {globalStyles} from '../../themes';
import {useNavigation} from '@react-navigation/core';
import {heightToDp, scale} from '../../utils';
import {getVehicles} from '../../store/slice/vehicle-slice';
import {useSelector, useDispatch} from 'react-redux';
import {useRef} from 'react';

const Vehicles = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    is_loading,
    is_more_loading,
    data: vehicle_data,
    error_message,
  } = useSelector(state => state.vehicle.vehicles);

  const {vehicles} = vehicle_data;

  // const [filteredVehicles, setFilteredVehicles] = useState([]);

  let loadFirstTime = useRef(0);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(getVehicles());
  }, []);

  // useEffect(() => {
  //   if (route.params.pick === true) {
  //     setFilteredVehicles(vehicles?.filter(e => e.status === 'Verified'));
  //   } else {
  //     setFilteredVehicles(vehicles);
  //   }
  // }, [vehicles]);

  // const searchHandle = text => {
  //   if (text !== '') {
  //     setFilteredVehicles(
  //       vehicles.filter(
  //         e =>
  //           e.rc_number.toLowerCase().includes(text.toLowerCase()) ||
  //           e.owner_name.toLowerCase().includes(text.toLowerCase()),
  //       ),
  //     );
  //   } else {
  //     setFilteredVehicles(vehicles);
  //   }
  // };

  const searchInputHandle = text => {
    if (text === '' && isSearching) {
      dispatch(getVehicles())
        .unwrap()
        .then(() => {
          setIsSearching(false);
          setPage(1);
        });
    }

    setSearchInput(text);
  };

  const searchSubmitHandle = () => {
    if (searchInput === '') return;
    if (isSearching) {
      dispatch(getVehicles())
        .unwrap()
        .then(() => {
          setSearchInput('');
          setIsSearching(false);
          setPage(1);
        });
    } else {
      dispatch(getVehicles({search: true, search_value: searchInput}))
        .unwrap()
        .then(() => {
          setPage(1);
          setIsSearching(true);
        })
        .catch(e => {
          setPage(1);
          setIsSearching(true);
        });
    }
  };

  const renderList = ({item, index}) => (
    <>
      <VehicleList vehicle={item} key={index} pick={route.params.pick} />

      {/* give some bottom margin to the last item in this list  */}
      {index == vehicles?.length - 1 && (
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
    dispatch(getVehicles())
      .unwrap()
      .then(() => {
        setIsFetching(false);
        setIsSearching(false);
        setPage(1);
        setSearchInput('');
      });
  };

  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.VEHICLES}
      />
      {is_loading && !isFetching && <LoadingView />}

      <View style={globalStyles.container}>
        {vehicles?.length === 0 && !is_loading ? (
          <>
            <View style={style.noDriverContainer}>
              <TouchableOpacity
                style={{
                  borderColor: '#d5d5d5',
                  borderWidth: 2,
                  borderRadius: 100,
                  marginBottom: 20,
                }}
                onPress={() => {
                  navigation.navigate(navigationStrings.ADD_VEHICLE, {});
                }}>
                <Appbar.Action
                  icon={'plus-thick'}
                  size={heightToDp(10)}
                  style={{}}
                  color="#d5d5d5"
                />
              </TouchableOpacity>
              <Text style={{fontSize: scale(6)}}>Add Your First Vehicle</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={[globalStyles.mediumText]}>
              {' '}
              Total : {vehicle_data?.total || 0}
            </Text>

            <TextInput
              mode="outlined"
              label="Search"
              placeholder="Enter RC number or owner name"
              style={[style.textInput, globalStyles.mediumText]}
              onChangeText={e => searchInputHandle(e)}
              keyboardType="default"
              returnKeyType="search"
              onSubmitEditing={() => {
                searchSubmitHandle();
              }}
              value={searchInput}
              right={
                <TextInput.Icon
                  icon={isSearching ? 'close' : 'magnify'}
                  style={{marginTop: heightToDp(1.5)}}
                  onPress={() => {
                    Keyboard.dismiss();
                    searchSubmitHandle();
                  }}
                />
              }
            />

            {error_message ? (
              <>
                <Text
                  style={[
                    globalStyles.bigText,
                    {
                      fontSize: scale(6),
                      alignSelf: 'center',
                      marginTop: heightToDp(10),
                    },
                  ]}>
                  {error_message}
                </Text>
              </>
            ) : (
              <FlatList
                data={vehicles}
                onRefresh={onRefresh}
                refreshing={isFetching}
                showsVerticalScrollIndicator={false}
                renderItem={renderList}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => {
                  if (page < vehicle_data?.total_number_of_pages) {
                    dispatch(
                      getVehicles({
                        page: page + 1,
                        ...(isSearching && {
                          search: true,
                          search_value: searchInput,
                        }),
                      }),
                    )
                      .unwrap()
                      .then(() => {
                        setPage(page + 1);
                      });
                  }
                }}
                onEndReachedThreshold={0.5}
              />
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Vehicles;
