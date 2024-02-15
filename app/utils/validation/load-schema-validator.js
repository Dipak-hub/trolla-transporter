// import React from 'react';

// import {useSelector, useDispatch} from 'react-redux';

const loadValidation = load => {
  // const {load, loading, error} = useSelector(state => state.load);

  const {
    vehicle_type,
    material_type,
    pickup_date,
    pickup,
    delivery,
    value,
    weight,
  } = load;

  if (vehicle_type === '') {
    return 'select vehicle type';
  }
  if (material_type === '') {
    return 'select material type';
  }
  if (weight == '') {
    return 'add weight';
  }
  if (weight == '0') {
    return "weight can't be 0";
  }
  if (value == '') {
    return 'add value';
  }
  if (value < 1000) {
    return "value can't less than 1000";
  }

  if (pickup.address.length === 0) {
    return 'add pickup and delivery address';
  }
  if (delivery.address.length === 0) {
    return 'add pickup and delivery address';
  }

  if (pickup.contact_number.length < 10) {
    return 'add a valid pickup contact number';
  }
  if (delivery.contact_number.length < 10) {
    return 'add a valid delivery contact number';
  }
  // if (pickup_date === new Date().toLocaleDateString()) {
  //   return 'invalid date';
  // }
  return true;
};

export default loadValidation;
