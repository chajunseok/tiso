import {TouchableOpacity} from '@gorhom/bottom-sheet';
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, PermissionsAndroid} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

async function requestPermissions() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  console.log('내 위치');
}

async function fetchShelters(latitude, longitude, shelter) {
  console.log('fetch함수실행');
  try {
    const response = await axios.get(
      `http://tiso.run:8000/shelters/type?lat=${latitude}&lng=${longitude}&type=${shelter}`,
    );
    console.log('API 요청보냄');
    console.log(response.data.data.shelterList);
    return response.data.data.shelterList;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ShelterInfoDetail = ({route, navigation}) => {
  const {categoryId} = route.params;
  const [shelters, setShelters] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '시설 정보',
      headerTitleStyle: {
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily: 'Pretendard-ExtraBold',
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
          const sheltersData = await fetchShelters(
            latitude,
            longitude,
            categoryId,
          );
          setShelters(sheltersData);
          console.log(shelters);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000},
      );
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.listItem}>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.capacity}>수용 인원: {item.capacity}</Text>
        </View>
        <View style={styles.navigatorContainer}>
          <TouchableOpacity>
            <Image
              source={require('../../../../assets/icons/Navigator.png')}
              style={styles.navigatorImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={shelters}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#666',
    marginBottom: 5,
  },
  capacity: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#007bff',
  },
  navigatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigatorImage: {
    width: 40,
    height: 40,
  },
});

export default ShelterInfoDetail;
