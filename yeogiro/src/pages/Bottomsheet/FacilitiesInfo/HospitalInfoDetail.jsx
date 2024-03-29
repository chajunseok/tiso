import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  FlatList,
  StyleSheet,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Config from 'react-native-config';
import axios from 'axios';

const KAKAO_API_KEY = Config.KAKAO_MAP_API_KEY;

const headers = {
  Authorization: `KakaoAK ${KAKAO_API_KEY}`,
};

async function requestPermissions() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  console.log('내 위치');
}

async function fetchHospitals(latitude, longitude) {
  console.log('fetch함수실행');
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=HP8&x=${longitude}&y=${latitude}`,
      {headers},
    );
    console.log('API 요청보냄');
    console.log(response.data);
    return response.data.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const HospitalInfoDetail = ({navigation}) => {
  const [hospitals, setHospitals] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '시설 정보',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    requestPermissions().then(() => {
      Geolocation.getCurrentPosition(
        async position => {
          console.log('위도 경도 저장');
          const {latitude, longitude} = position.coords;
          console.log(latitude, longitude);
          const hospitalsData = await fetchHospitals(latitude, longitude);
          console.log(hospitalsData);
          setHospitals(hospitalsData);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000},
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={hospitals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text style={styles.title}>{item.place_name}</Text>
            <Text>{item.road_address_name || item.address_name}</Text>
            <Text>{item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#007bff',
  },
});

export default HospitalInfoDetail;
