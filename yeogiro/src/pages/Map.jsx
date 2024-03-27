import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

function MyMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    // 위치 권한 요청
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // 위치 권한 허용됨
            getMyLocation();
          } else {
            console.log('Location permission denied');
          }
        } else {
          // Android 이외의 플랫폼에서는 바로 위치를 가져옴
          getMyLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  const getMyLocation = () => {
    console.log(currentLocation);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        setButtonDisabled(true); // 버튼 비활성화
        setTimeout(() => {
          setButtonDisabled(false); // 10초 후 버튼 활성화
        }, 10000);
      },
      error => {
        console.warn(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <View>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={false}
        center={
          currentLocation
            ? {...currentLocation, zoom: 16}
            : {latitude: 37.564362, longitude: 126.977011, zoom: 16}
        }
        onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        {currentLocation && (
          <Marker coordinate={currentLocation} pinColor="green" />
        )}
      </NaverMapView>
      <TouchableWithoutFeedback
        onPress={getMyLocation}
        disabled={buttonDisabled}>
        <View
          style={[
            styles.locationButton,
            buttonDisabled && styles.disabledButton,
          ]}>
          <Image
            style={styles.myLocationImage}
            source={require('../../assets/icons/MyLocation.png')}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  locationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 455,
    right: 13,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {width: 2, height: 2},
    elevation: 2,
  },
  myLocationImage: {
    width: 20,
    height: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc', // 회색 배경색
  },
});

export default MyMap;
