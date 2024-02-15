export {
  imagePickerCamera,
  imagePickerGallery,
} from '../utils/image/image-picker';

export {widthToDp, heightToDp, scale} from './responsive/responsive';
export {clearAsyncStorage} from './storage';
export {getVersionCode} from './app-package-details';
export {locationPermission} from './map-service/helper-function';
export {default as rootClient} from './api/root-client';
export {default as fcmService} from './notifications/notification';
export {default as socket} from './web-socket/socket';
export {default as addressToCoordinate} from './map-service/address-to-coordinate';
export {default as coordinateToAddress} from './map-service/coordinate-to-address';
export {default as otpGenerator} from './otp-generator';
// validator -------------------------------------------------------------------------

export {default as loadValidator} from './validation/load-schema-validator';
export {default as kycValidator} from './validation/kyc-schema-validator';
