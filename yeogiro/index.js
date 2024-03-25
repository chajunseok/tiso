/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  PushNotification.localNotification({
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
    largeIconUrl: remoteMessage.notification.android.imageUrl,
    bigPictureUrl: remoteMessage.notification.android.imageUrl,
  });
});
AppRegistry.registerComponent(appName, () => App);
