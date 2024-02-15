import React from 'react';

import {useSelector, useDispatch} from 'react-redux';

const kycValidator = () => {
  const {data, loading, error} = useSelector(state => state.user);

  const {user_name, email, mobile_secondary, address, documents} = data;

  if (email === undefined) {
    false;
  }

  return true;
};

export default kycValidator;
