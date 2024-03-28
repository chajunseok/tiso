import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
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
  const [pathLine, setPath] = useState([]);

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

  const updatePath = () => {
    setPath();
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
        }>
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            image={require('../../assets/icons/SubIcon.png')}
            width={30}
            height={30}
          />
        )}
      </NaverMapView>
      <TouchableWithoutFeedback
        style={{
          borderRadius: 2,
        }}
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
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    width: 41,
    height: 41,
    top: 12.6,
    right: 12.6,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#b5b2b3',
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
