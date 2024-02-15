// import React from 'react';
const getDateFormat = tempDate => {
  let fDate =
    tempDate.getDate() +
    '/' +
    (tempDate.getMonth() + 1) +
    '/' +
    tempDate.getFullYear();
  return fDate;
};

// let fTime =
//   'Hours : ' + tempDate.getHours() + '| Minutes : ' + tempDate.getMinutes();

export default getDateFormat;
