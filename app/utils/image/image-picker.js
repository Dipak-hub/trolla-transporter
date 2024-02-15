import ImagePicker from 'react-native-image-crop-picker';
import React, {useState} from 'react';
import {heightToDp, widthToDp} from '../responsive/responsive';

// -------------- image picker from camera--------------------------------------

const imagePickerCamera = async (type = null) => {
  let imagePath = '';
  await ImagePicker.openCamera({
    width: widthToDp(100),
    height: heightToDp(50),
    cropping: true,
    freeStyleCropEnabled: true,
  }).then(image => {
    imagePath = image.path;
  });
  return imagePath;
};

// ---------------- image picker from  gallery-------------------------------------

const imagePickerGallery = async (type = null, Width = 400, Height = 300) => {
  let imagePath = '';
  await ImagePicker.openPicker({
    // multiple: true,
    width: widthToDp(100),
    height: heightToDp(50),
    cropping: true,
    freeStyleCropEnabled: true,
  }).then(image => {
    imagePath = image.path;
  });
  return imagePath;
};

export {imagePickerCamera, imagePickerGallery};
