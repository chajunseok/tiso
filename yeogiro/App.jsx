import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from './src/pages/BottomSheet';
import Map from './src/pages/Map';

const App = () => {
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

    // 포그라운드 메시지 리스너 등록
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

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Map" component={Map} />
    //     <Stack.Screen name="BottomSheet" component={BottomSheet} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <GestureHandlerRootView>
      <Map />
      <BottomSheet />
    </GestureHandlerRootView>
  );
};

export default App;
