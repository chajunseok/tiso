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
import {pathDataState, emergencyState, dangerAreaDataState} from './src/state/atoms';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMainLoading, setIsMainLoading] = useState(true);
  const setEmergency = useSetRecoilState(emergencyState);

  useEffect(() => {
    const getToken = async () => {
      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);

      const token = await messaging().getToken();
      console.log('Device token:', token);

      await AsyncStorage.setItem('pushToken', token);
    };

    getToken();
  }, []);

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
    const unsubscribe = messaging().onMessage(
      async remoteMessage => {
        const {title, body} = remoteMessage.notification;
        PushNotification.localNotification({
          title: title,
          message: body,
        });
        setEmergency(prevState => ({
          ...prevState,
          isVisible: true,
        }));
        return unsubscribe;
      },
      [setEmergency],
    );

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

  const [currentLocation, setCurrentLocation] = useState(null);
  const setPathData = useSetRecoilState(pathDataState);
  const setDangerAreaData = useSetRecoilState(dangerAreaDataState);

  useEffect(() => {
    requestPermissions().then(() => {
      Geolocation.getCurrentPosition(
        async position => {
          console.log('위도 경도 저장');
          const {latitude, longitude} = position.coords;
          console.log(latitude, longitude);
          setCurrentLocation({latitude, longitude});
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000},
      );
    });
  }, []);

  async function requestPermissions() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log('내 위치');
  }

  async function findRoute(latitude, longitude) {
    console.log('최적 길찾기 함수 실행');
    try {
      const response = await axios.get(
        `http://tiso.run:8000/emergency/path?latitude=${latitude}&longitude=${longitude}`,
      );
      console.log('길찾기 API 요청보냄');
      setPathData(response.data.data.pathInfo.path);
      setDangerAreaData(response.data.data.dangerAreaInfo);
      console.log(response.data.data.pathInfo.path);
      console.log(response.data.data.dangerAreaInfo);
    } catch (error) {
      if (error.response && error.response.status === 402) {
        console.error('Validation Error: ', error.response.data);
      } else {
        console.error('An unexpected error occurred: ', error);
      }
      return [];
    }
  }

  const handleFindPath = async () => {
    setIsLoading(true);
    try {
      await findRoute(currentLocation.latitude, currentLocation.longitude);
    } catch (error) {
      console.error('폴리라인 데이터 가져오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
