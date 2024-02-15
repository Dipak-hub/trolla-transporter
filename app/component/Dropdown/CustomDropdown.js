import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDown from 'react-native-paper-dropdown';
import {Dropdown} from 'react-native-element-dropdown';
import {colorStrings} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  setDriverCity,
  setDriverState,
  updateCity,
  updateState,
} from '../../store';

export default function CustomDropdown({data, state, city, user}) {
  const dispatch = useDispatch();
  const arr = data.map(e => {
    const state = {label: e.state, value: e.state};
    return state;
  });

  const [stateSelected, setStateSelected] = useState('');
  const [citySelected, setCitySelected] = useState('');
  const [cityDataVar, setCityDataVar] = useState();

  //element dropdown dependencies
  const [value, setValue] = useState(null);
  const [isStateFocus, setIsStateFocus] = useState(false);
  const [isCityFocus, setIsCityFocus] = useState(false);
  //
  useEffect(() => {
    if (state != '' && state != null) {
      const cities = data.filter(e => e.state === state);

      const cityData = cities[0].cities.map(e => {
        const filterCity = {label: e.name, value: e.name};
        return filterCity;
      });
      setCityDataVar(cityData);
    }
  }, [stateSelected, state]);

  const renderStateLabel = () => {
    if (stateSelected || isStateFocus) {
      return (
        <Text style={[styles.label, isStateFocus && {color: 'gray'}]}>
          Select State
        </Text>
      );
    }
    return null;
  };

  const renderCityLabel = () => {
    if (citySelected || isCityFocus) {
      return (
        <Text style={[styles.label, isCityFocus && {color: 'gray'}]}>
          Select City
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={{marginBottom: 10, marginTop: 8}}>
      {renderStateLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isStateFocus && {
            borderColor: colorStrings.COLOR_PRIMARY,
            borderWidth: 2,
          },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={arr}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isStateFocus ? 'Select State' : '...'}
        searchPlaceholder="Search..."
        value={state}
        onFocus={() => setIsStateFocus(true)}
        onBlur={() => setIsStateFocus(false)}
        onChange={item => {
          if (user === 'Driver') {
            dispatch(setDriverState(item.value));
          } else {
            dispatch(updateState(item.value));
          }

          setStateSelected(item.value);
          setIsStateFocus(false);
        }}
      />

      {/* <DropDown
        key={arr}
        label={'State'}
        mode={'outlined'}
        visible={showStateDropDown}
        value={state}
        setValue={setState}
        onDismiss={() => setStateShowDropDown(false)}
        showDropDown={() => setStateShowDropDown(true)}
        list={arr}
      /> */}
      {cityDataVar != '' || city != '' ? (
        <View style={{marginTop: 20}}>
          {renderCityLabel()}
          <Dropdown
            style={[
              styles.dropdown,
              isCityFocus && {
                borderColor: colorStrings.COLOR_PRIMARY,
                borderWidth: 2,
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={cityDataVar}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isCityFocus ? 'Select City' : '...'}
            searchPlaceholder="Search..."
            value={city}
            onFocus={() => setIsCityFocus(true)}
            onBlur={() => setIsCityFocus(false)}
            onChange={item => {
              if (user == 'Driver') {
                dispatch(setDriverCity(item.value));
              } else {
                dispatch(updateCity(item.value));
              }

              setCitySelected(item.value);
              setIsCityFocus(false);
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    backgroundColor: colorStrings.WHITE_SMOKE,
    height: 50,
    borderColor: colorStrings.DARK_GRAY,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    color: 'gray',
    position: 'absolute',
    backgroundColor: colorStrings.SNOW_WHITE,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1.2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
