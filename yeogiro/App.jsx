import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from './src/pages/BottomSheet';
import Map from './src/pages/Map';
import Loading from './src/pages/Loading';
import MainLoading from './src/pages/MainLoading';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMainLoading, setIsMainLoading] = useState(true);

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken(); // 권한이 허용되면 FCM 토큰을 요청
      }
    };

    // 유저 토큰값 얻기
    async function getFcmToken() {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('Your Firebase Token is:', fcmToken);
      } else {
        console.log('Failed to get FCM token');
      }
    }

    requestUserPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification;
      const imageUrl = remoteMessage.data.imageUrl;

      PushNotification.localNotification({
        title: title,
        message: body,
        largeIconUrl: imageUrl,
        smallIcon: 'ic_notification',
        bigPictureUrl: imageUrl,
      });
    });

    const timer = setTimeout(() => {
      setIsMainLoading(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handleFindPath = () => {
    console.log('로딩중');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  if (isMainLoading) {
    return <MainLoading />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {isLoading ? <Loading /> : <Map />}
      <BottomSheet onFindPath={handleFindPath} />
    </GestureHandlerRootView>
  );
};

export default App;
