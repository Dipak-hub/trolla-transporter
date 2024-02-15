import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import style from './style';
import {HeaderComponent, LoadList, LoadingView} from '../../component';
import {navigationStrings, colorStrings} from '../../constants';
import {getLoads} from '../../store';
import {globalStyles, size} from '../../themes';
import {
  ActivityIndicator,
  Button,
  Subheading,
  Text,
  IconButton,
} from 'react-native-paper';
import {heightToDp, scale} from '../../utils';
const Loads = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    is_loading,
    is_more_loading,
    data: load_data,
    error_message,
  } = useSelector(state => state.load.loads);
  const {loads} = load_data;

  const {user} = useSelector(state => state.user);

  const pickupTextInputRef = useRef();
  const deliveryTextInputRef = useRef();
  // useFocusEffect(
  //   useCallback(() => {
  //     if (loadFirstTime.current == 0) {
  //       dispatch(getLoads());
  //     } else {
  //       dispatch(getReLoads());
  //     }
  //     setFilteredLoads(loads);
  //     loadFirstTime.current = loadFirstTime.current + 1;
  //   }, [loadFirstTime]),
  // );

  let loadFirstTime = useRef(0);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState({pickup: '', delivery: ''});

  // console.log(searchInput);

  useEffect(() => {
    if (loadFirstTime.current === 0) {
      dispatch(getLoads());
      // console.log('load called');
    }
    loadFirstTime.current = loadFirstTime.current + 1;
    // ------------------------------------------------
  }, []);

  useEffect(() => {
    if (route.params?.pickup_search_box_focus) {
      pickupTextInputRef.current.focus();
    } else if (route.params?.delivery_search_box_focus) {
      deliveryTextInputRef.current.focus();
    }
  }, [route.params]);

  const searchInputHandle = (text, searchTerm) => {
    if (text === '' && isSearching) {
      dispatch(getLoads())
        .unwrap()
        .then(() => {
          setIsSearching(false);
          setPage(1);
        });
    } else {
      setSearchInput(pre => ({...pre, [searchTerm]: text}));
      // setIsSearching(true);
    }

    // setSearchInput(text);
  };

  const searchSubmitHandle = () => {
    dispatch(
      getLoads({
        search: true,
        pickup_address: searchInput?.pickup,
        delivery_address: searchInput?.delivery,
      }),
    )
      .unwrap()
      .then(() => {
        setPage(1);
        setIsSearching(true);
      })
      .catch(e => {
        setPage(1);
        setIsSearching(true);
      });
  };

  const renderList = ({item, index}) => (
    <>
      <LoadList load={item.load} />
      {index == loads?.length - 1 && (
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
              height: 200,
              backgroundColor: colorStrings.SNOW_WHITE,
            }}></View>
        </>
      )}
    </>
  );

  const onRefresh = async () => {
    setIsFetching(true);
    dispatch(getLoads())
      .unwrap()
      .then(() => {
        setIsFetching(false);
        setIsSearching(false);
        setPage(1);
        setSearchInput({pickup: '', delivery: ''});
      });
  };

  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        title={navigationStrings.SEARCH_LOAD}
      />

      <View style={globalStyles.container}>
        <View style={style.searchLoadBoxWrapper}>
          {/* <TouchableOpacity> */}
          <View style={style.searchLoadBox}>
            <View style={style.greenCircle}></View>
            <TextInput
              mode="outlined"
              label="Enter Loading Point"
              placeholder="Enter Loading Point"
              value={searchInput?.pickup}
              ref={pickupTextInputRef}
              placeholderTextColor="black"
              keyboardType="default"
              onChangeText={e => searchInputHandle(e, 'pickup')}
              returnKeyType="search"
              onSubmitEditing={() => {
                searchSubmitHandle();
              }}
              style={[style.textInput, globalStyles.mediumText]}
            />
            {searchInput?.pickup?.length > 0 && (
              <IconButton
                icon="close"
                onPress={() => {
                  setSearchInput(pre => ({...pre, pickup: ''}));
                  if (isSearching) {
                    dispatch(
                      getLoads(
                        searchInput.delivery.length > 0 && {
                          search: true,
                          delivery_address: searchInput?.delivery,
                        },
                      ),
                    )
                      .unwrap()
                      .then(() => {
                        setIsSearching(searchInput.delivery.length > 0);
                        setPage(1);
                      });
                  }
                }}
              />
            )}
          </View>
          {/* </TouchableOpacity> */}
          <View style={style.grayLine}></View>
          {/* <TouchableOpacity> */}
          <View style={style.searchLoadBox}>
            <View style={style.redCircle}></View>
            <TextInput
              mode="outlined"
              label="Enter Loading Point"
              placeholder="Enter Unloading Point"
              placeholderTextColor="black"
              value={searchInput?.delivery}
              ref={deliveryTextInputRef}
              onChangeText={e => searchInputHandle(e, 'delivery')}
              keyboardType="default"
              returnKeyType="search"
              onSubmitEditing={() => {
                searchSubmitHandle();
              }}
              style={[style.textInput, globalStyles.mediumText]}
            />
            {searchInput?.delivery?.length > 0 && (
              <IconButton
                icon="close"
                onPress={() => {
                  setSearchInput(pre => ({...pre, delivery: ''}));
                  if (isSearching) {
                    dispatch(
                      getLoads(
                        searchInput.pickup.length > 0 && {
                          search: true,
                          pickup_address: searchInput?.pickup,
                        },
                      ),
                    )
                      .unwrap()
                      .then(() => {
                        setIsSearching(searchInput.pickup.length > 0);
                        setPage(1);
                      });
                  }
                }}
              />
            )}
          </View>
          {/* </TouchableOpacity> */}
        </View>
        <Text style={[globalStyles.mediumText]}>
          {' '}
          Total : {load_data?.total || 0}
        </Text>

        <View
          style={[
            globalStyles.mb_2,
            {
              flexDirection: 'row',
              width: '100%',
              // backgroundColor: 'red',
              justifyContent: 'flex-end',
            },
          ]}>
          {(searchInput?.pickup?.length > 0 ||
            searchInput?.delivery?.length > 0) && (
            <Button
              icon="close"
              mode="outlined"
              style={[globalStyles.mr_2]}
              onPress={() => {
                setSearchInput({pickup: '', delivery: ''});
                if (isSearching) {
                  dispatch(getLoads())
                    .unwrap()
                    .then(() => {
                      setIsSearching(false);
                      setPage(1);
                    });
                }
              }}>
              Clear
            </Button>
          )}
          {(searchInput?.pickup?.length > 0 ||
            searchInput?.delivery?.length > 0) && (
            <Button
              icon="magnify"
              mode="contained"
              color={colorStrings.COLOR_PRIMARY_YELLOW}
              style={[globalStyles.mr_2]}
              onPress={() => {
                Keyboard.dismiss();
                searchSubmitHandle();
              }}>
              Search
            </Button>
          )}
        </View>

        {is_loading && !isFetching && <LoadingView />}

        <>
          {/* {isSearched && filteredLoads?.length === 0 && (
            <Text
              style={{
                textAlign: 'center',
                fontSize: size.MEDIUM,
                marginBottom: heightToDp(6),
                marginTop: heightToDp(10),
              }}>
              Sorry, no load has been available now from this location.
            </Text>
          )} */}
          {/* 
          {loads?.length === 0 ? (
            <>
              {user.status === 'Verified' ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: size.LARGE,
                    marginBottom: heightToDp(6),
                    marginTop: heightToDp(10),
                  }}>
                  Sorry, no loads are available now.
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: size.LARGE,
                    marginBottom: heightToDp(6),
                    marginTop: heightToDp(10),
                  }}>
                  To see loads ,You have to complete your KYC first.
                </Text>
              )}
            </>
          ) : (
            <FlatList
              data={filteredLoads}
              onRefresh={onRefresh}
              refreshing={isFetching}
              showsVerticalScrollIndicator={false}
              renderItem={renderList}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => {
                if (page < load_data?.total_number_of_pages) {
                  dispatch(getLoads({page: page + 1}))
                    .unwrap()
                    .then(() => {
                      setPage(page + 1);
                    });
                }
              }}
              onEndReachedThreshold={0.5}
            />
          )} */}

          {loads?.length === 0 ? (
            <>
              {user?.status === 'Verified' ? (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: size.LARGE,
                    marginBottom: heightToDp(6),
                    marginTop: heightToDp(10),
                  }}>
                  Sorry, no loads are available now.
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: size.LARGE,
                    marginBottom: heightToDp(6),
                    marginTop: heightToDp(10),
                  }}>
                  To see loads ,You have to complete your KYC first.
                </Text>
              )}
            </>
          ) : (
            <>
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
                <>
                  <FlatList
                    data={loads}
                    onRefresh={onRefresh}
                    refreshing={isFetching}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderList}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => {
                      if (page < load_data?.total_number_of_pages) {
                        // console.log('---------');
                        dispatch(
                          getLoads({
                            page: page + 1,
                            ...(isSearching && {
                              search: true,
                              pickup_address: searchInput?.pickup,
                              delivery_address: searchInput?.delivery,
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
                </>
              )}
            </>
          )}
        </>
      </View>
    </>
  );
};

export default Loads;
