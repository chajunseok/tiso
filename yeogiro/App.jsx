import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from './src/pages/BottomSheet';
import Map from './src/pages/Map';
import Loading from './src/pages/Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

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
    return unsubscribe;
  }, []);

  const handleFindPath = () => {
    console.log('로딩중');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {isLoading ? <Loading /> : <Map />}
      <BottomSheet onFindPath={handleFindPath} />
    </GestureHandlerRootView>
  );
};

export default App;
