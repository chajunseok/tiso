import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from './src/pages/BottomSheet';
import Map from './src/pages/Map';
import Loading from './src/pages/Loading';
import MainLoading from './src/pages/MainLoading';
import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {
  pathDataState,
  emergencyState,
  dangerAreaDataState,
} from './src/state/atoms';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMainLoading, setIsMainLoading] = useState(true);
  const setPathData = useSetRecoilState(pathDataState);
  const setEmergency = useSetRecoilState(emergencyState);

  // 앱 실행 시 푸시 토큰을 가져오고 저장
  useEffect(() => {
    async function fetchToken() {
      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);

      const token = await messaging().getToken();
      console.log('Device token:', token);

      await AsyncStorage.setItem('pushToken', token);
    }

    fetchToken();
  }, []);

  // 백그라운드에서 푸시 알림으로 앱 시작 처리
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleFindPath();
        }
      });
  }, []);

  // 포그라운드 상태에서 푸시 알림 수신 처리
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });

      setEmergency({
        isVisible: true,
      });

      setTimeout(() => {
        setEmergency({
          isVisible: false,
        });
      }, 1800000);

      handleFindPath();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMainLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const [currentLocation, setCurrentLocation] = useState(null);
  const setDangerAreaData = useSetRecoilState(dangerAreaDataState);

  useEffect(() => {
    async function getCurrentLocation() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setCurrentLocation({latitude, longitude});
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 15000},
        );
      } else {
        console.log('Location permission denied');
      }
    }

    getCurrentLocation();
  }, []);

  async function handleFindPath() {
    if (currentLocation) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://tiso.run:8000/emergency/path?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`,
        );
        setPathData(response.data.data.pathInfo.path);
        setDangerAreaData(response.data.data.dangerAreaInfo);
      } catch (error) {
        console.log('Error finding route:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  if (isMainLoading) {
    return <MainLoading />;
  }

  return (
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
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default App;
