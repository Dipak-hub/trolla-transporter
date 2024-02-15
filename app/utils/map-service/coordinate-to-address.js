import Geocoder from 'react-native-geocoder';
import {GOOGLE_MAP_API_KEY} from '@env';

const coordinateToAddress = async (lat, lng) => {
  try {
    Geocoder.fallbackToGoogle(GOOGLE_MAP_API_KEY); //   api key
    let res = await Geocoder.geocodePosition({
      lat: lat, //
      lng: lng,
    });
    let address = res[0].formattedAddress;
    return address;
  } catch (error) {}
};

export default coordinateToAddress;
