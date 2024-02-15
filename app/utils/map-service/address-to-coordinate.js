
import {GOOGLE_MAP_API_KEY} from '@env';

const addressToCoordinate = async location => {
  try {
    Geocoder.fallbackToGoogle(GOOGLE_MAP_API_KEY); //   api key
    let res = await Geocoder.geocodeAddress(location);
    return res;
  } catch (error) {
  }
};

export default addressToCoordinate;
