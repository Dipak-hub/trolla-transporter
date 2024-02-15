import {Alert} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

class CustomAlertMessageHandler {
  constructor(statusCode, message, title) {
    this.statusCode = statusCode;
    this.message = message;
    this.title = title;

    // Error.captureStackTrace(this, this.constructor);
  }

  static resourceNotFound(message) {}
  static alreadyExist(message) {}
  static wrongCredentials(
    title = 'Something wrong !',
    message = 'User name or !',
  ) {
    return Alert.alert(title, message);
  }
  static unAuthorize(message = 'unAuthorize ') {}
  static notFound(message = 'Not found 404 ') {}

  static somethingWrong(
    title = 'Something wrong..',
    message = 'Please check your internet connection.',
  ) {
    return Alert.alert(title, message);
  }
  static kycSubmitted(
    title = 'Request submitted..',
    message = 'Please wait for verification.',
  ) {
    return Alert.alert(title, message);
  }

  static unVerified(
    message = 'unverified please complete your KYC verification... ',
  ) {}

  static verifiedNotAllowed(title, message) {
    return Alert.alert(
      (title = 'Not allowed !'),
      (message =
        'you can not change your verified KYC, Please contact support team.'),
    );
  }
}

export default CustomAlertMessageHandler;
