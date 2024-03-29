import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    <GestureHandlerRootView style={{flex: 1}}>
      {isLoading ? <Loading /> : <Map />}
      <BottomSheet onFindPath={handleFindPath} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Optional: Loading 컴포넌트 배경을 어둡게 하여 화면에 더 잘 드러나게 함
  },
});

export default App;
