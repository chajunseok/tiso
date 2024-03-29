import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from './src/pages/BottomSheet';
import Map from './src/pages/Map';
import Loading from './src/pages/Loading';
import MainLoading from './src/pages/MainLoading';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMainLoading, setIsMainLoading] = useState(true);

  useEffect(() => {
    const requestUserPermission = async () => {
      const isPushEnabledStr = await AsyncStorage.getItem('isPushEnabled');
      const isPushEnabled =
        isPushEnabledStr !== null ? JSON.parse(isPushEnabledStr) : true;

      if (isPushEnabled) {
        const authStatus = await messaging().requestPermission();
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();
  }, []);

  // 로컬 알림 처리
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification;
      PushNotification.localNotification({
        title: title,
        message: body,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // 앱 로딩 상태 관리
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMainLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleFindPath = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  if (isMainLoading) {
    return <MainLoading />;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        {isLoading ? <Loading /> : <Map />}
        <BottomSheet onFindPath={handleFindPath} />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
