import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from './src/pages/BottomSheet';
import Map from './src/pages/Map';
import Loading from './src/pages/Loading';
import MainLoading from './src/pages/MainLoading';
import {View, StyleSheet} from 'react-native';
import {RecoilRoot} from 'recoil';

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
    <RecoilRoot>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Map />
          <BottomSheet onFindPath={handleFindPath} />
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <Loading />
            </View>
          )}
        </View>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default App;
