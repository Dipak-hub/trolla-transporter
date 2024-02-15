import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import { navigationStrings } from '../../constants';

class FCMService {
  // registering and checking the permission
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  // registering with FCM firebase
  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  // checking the permission
  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
      });
  };

  //get the fcm token
  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
        }
      })
      .catch(error => {
      });
  };

  // requesting  permission for fcm
  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
      });
  };

  //deleting the fcm token
  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch(error => {
      });
  };

  // notification listener
  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // when the application is running, but in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification, remoteMessage.data);
      }
    });
    // when the application is opened from a quite state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification, remoteMessage.data);
          // navigation.navigate(navigationStrings.NOTIFICATION_SCREEN)
        }
      });

    // foreground state message
    this.messageListener = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification, remoteMessage.data);
        // navigation.navigate(navigationStrings.NOTIFICATION_SCREEN)
      }
    });

    // triggered when have new token
    messaging().onTokenRefresh(fcmToken => {
      onRegister(fcmToken);
    });
  };

  //for un registering with firebase
  unRegister = () => {
    this.messageListener();
  };
}

const fcmService = new FCMService();
export default fcmService;