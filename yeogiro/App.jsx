import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomSheet from './src/pages/BottomSheet';
import Map from './src/pages/Map';
import Loading from './src/pages/Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const Stack = createStackNavigator();

  useEffect(() => {
    // 사용자로부터 알림 권한 요청
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
        largeIconUrl: imageUrl, // 이미지 URL
        smallIcon: 'ic_notification', // 앱의 작은 아이콘
        bigPictureUrl: imageUrl,
      });
    });
    // Clean up the onMessage listener
    return unsubscribe;
  }, []);

  const showLoadingScreen = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5초 후에 로딩 상태를 false로 설정
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Map" component={Map} />
          {/* 로딩 상태와 상관없이 BottomSheet 컴포넌트를 표시합니다. */}
          {/* isLoading 상태에 따른 조건부 렌더링을 제거했습니다. */}
        </Stack.Navigator>
      </NavigationContainer>
      {/* 로딩이 활성화되었을 때만 Loading 컴포넌트를 표시합니다. */}
      {isLoading && <Loading />}
      {/* BottomSheet를 항상 표시합니다. */}
      <BottomSheet
        setIsLoading={setIsLoading}
        showLoadingScreen={showLoadingScreen}
      />
    </GestureHandlerRootView>
  );
};

// return (
//   <NavigationContainer>
//     <Stack.Navigator>
//       <Stack.Screen name="Map" component={Map} />
//       <Stack.Screen name="BottomSheet" component={BottomSheet} />
//       <Stack.Screen name="Loading" component={Loading} />
//     </Stack.Navigator>
//   </NavigationContainer>
// );

export default App;
