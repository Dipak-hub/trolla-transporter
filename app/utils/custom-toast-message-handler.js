import {Alert, ToastAndroid} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

class CustomToastMessageHandler {
  constructor(message, title) {
    this.message = message;
    this.title = title;

    // Error.captureStackTrace(this, this.constructor);
  }

  static kycSubmitted(title = 'Something wrong !', message = 'User name or !') {
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.LONG,
    );
  }
}

export default CustomToastMessageHandler;
