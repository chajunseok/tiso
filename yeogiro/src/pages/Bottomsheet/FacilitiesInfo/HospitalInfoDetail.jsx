import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  FlatList,
  StyleSheet,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {nmId, nmSecret} from '../../../util/http-commons';

async function requestPermissions() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  console.log('내 위치');
}

async function fetchHospitals(latitude, longitude) {
  console.log('fetch함수실행');
  const clientId = nmId();
  const clientSecret = nmSecret();
  console.log(clientId);
  console.log(clientSecret);
  try {
    const response = await fetch(
      `https://openapi.naver.com/v1/search/local.xml?query=병원&display=10&start=1&sort=random"&latitude=${latitude}&longitude=${longitude}`,
      {
        method: 'GET',
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      },
    );
    console.log('API 요청보냄');
    console.log(response);
    const json = await response.json();
    return json.items;
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
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.address}</Text>
            <Text>{item.telephone}</Text>
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
  },
  title: {
    fontWeight: 'bold',
  },
});

export default HospitalInfoDetail;
