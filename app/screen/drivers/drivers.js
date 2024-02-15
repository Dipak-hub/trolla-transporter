import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {DriverList, HeaderComponent, LoadingView} from '../../component';
import style from './style';
import {
  Text,
  Button,
  TextInput,
  Card,
  Appbar,
  ActivityIndicator,
  IconButton,
} from 'react-native-paper';
import {iconPath, navigationStrings} from '../../constants';
import {globalStyles} from '../../themes';
import {useNavigation} from '@react-navigation/core';
import {heightToDp, scale, widthToDp} from '../../utils';
import {useSelector, useDispatch} from 'react-redux';
import {getDrivers} from '../../store';
import {} from 'react-native-gesture-handler';

const Drivers = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    is_loading,
    is_more_loading,
    data: drivers_data,
    error_message,
  } = useSelector(state => state.driver.drivers);

  const {drivers} = drivers_data;

  // const [filteredDrivers, setFilteredDrivers] = useState([]);

  let loadFirstTime = useRef(0);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(getDrivers());
  }, []);

  // const {pick: listPickerMode} = route.params;

  // useEffect(() => {
  //   if (listPickerMode === true) {
  //     setFilteredDrivers(drivers?.filter(e => e.status === 'Verified'));
  //   } else {
  //     setFilteredDrivers(drivers);
  //   }
  // }, [drivers]);

  // const searchHandle = text => {
  //   if (text !== '') {
  //     setFilteredDrivers(
  //       drivers.filter(
  //         e =>
  //           e.user_name.toLowerCase().includes(text.toLowerCase()) ||
  //           e.mobile_primary
  //             .toString()
  //             .toLowerCase()
  //             .includes(text.toLowerCase()),
  //       ),
  //     );
  //   } else {
  //     setFilteredDrivers(drivers);
  //   }
  // };'

  const searchInputHandle = text => {
    if (text === '' && isSearching) {
      dispatch(getDrivers())
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
      dispatch(getDrivers())
        .unwrap()
        .then(() => {
          setSearchInput('');
          setIsSearching(false);
          setPage(1);
        });
    } else {
      dispatch(getDrivers({search: true, search_value: searchInput}))
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
      <DriverList driver={item} key={index} pick={route.params.pick} />

      {/* to give some bottom margin to the last item list  */}
      {index == drivers?.length - 1 && (
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
    dispatch(getDrivers())
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
        title={navigationStrings.DRIVERS}
      />
      {is_loading && !isFetching && <LoadingView />}

      <View style={globalStyles.container}>
        {drivers?.length === 0 && !is_loading ? (
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
                  navigation.navigate(navigationStrings.ADD_DRIVER, {});
                }}>
                {/*           
            <Image
           style={{height:heightToDp(8),width:widthToDp(15)}}
           source={iconPath.DRIVER} /> */}

                <Appbar.Action
                  icon={'plus-thick'}
                  size={heightToDp(10)}
                  style={{}}
                  color="#d5d5d5"
                />
              </TouchableOpacity>
              <Text style={{fontSize: scale(6)}}>Add Your First Driver</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={[globalStyles.mediumText]}>
              {' '}
              Total : {drivers_data?.total || 0}
            </Text>
            <TextInput
              mode="outlined"
              label="Search"
              placeholder="Enter name or mobile number"
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
                data={drivers}
                onRefresh={onRefresh}
                refreshing={isFetching}
                showsVerticalScrollIndicator={false}
                renderItem={renderList}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => {
                  if (page < drivers_data?.total_number_of_pages) {
                    // console.log('---------');
                    dispatch(
                      getDrivers({
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

export default Drivers;
