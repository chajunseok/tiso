import React, {useLayoutEffect, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {
  shelterState,
  bottomSheetState,
  pathDataState,
} from '../../../state/atoms';
import axios from 'axios';
import {selectedFacilityIdState} from '../../../state/selectedAtom';
import {useFocusEffect} from '@react-navigation/native';

async function requestPermissions() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  // console.log('내 위치');
}

async function fetchShelters(latitude, longitude, shelter) {
  // console.log('fetch함수실행');
  try {
    const response = await axios.get(
      `http://tiso.run:8000/shelters/type?lat=${latitude}&lng=${longitude}&type=${shelter}`,
    );
    // console.log('API 요청보냄');
    // console.log(response.data.data.shelterList);
    return response.data.data.shelterList;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ShelterInfoDetail = ({route, navigation}) => {
  const [selectedFacilityId, setselectedFacilityId] = useRecoilState(
    selectedFacilityIdState,
  );
  const setBottomSheet = useSetRecoilState(bottomSheetState);
  const [currentLocation, setCurrentLocation] = useState(null);
  const setPathData = useSetRecoilState(pathDataState);
  const {categoryId} = route.params;
  const [shelters, setShelters] = useRecoilState(shelterState);
  const onSheltersPress = sheltersId => {
    setselectedFacilityId(sheltersId);
    setBottomSheet({isOpen: true, index: 0});
  };

  async function findShelter(shelter_id, latitude, longitude) {
    // console.log('길찾기 함수 실행');
    // console.log(shelter_id, latitude, longitude);
    try {
      const response = await axios.get(
        `http://tiso.run:8000/paths?shelter_id=${shelter_id}&latitude=${latitude}&longitude=${longitude}`,
      );
      // console.log('길찾기 API 요청보냄');
      setPathData(response.data.data.path);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Validation Error: ', error.response.data);
      } else {
        console.error('An unexpected error occurred: ', error);
      }
      return [];
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '대피소 정보',
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Pretendard-ExtraBold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setPathData(null);
        setShelters([]);
      };
    }, [setShelters, setPathData]),
  );

  useEffect(() => {
    requestPermissions().then(() => {
      Geolocation.getCurrentPosition(
        async position => {
          // console.log('위도 경도 저장');
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
          // console.log(latitude, longitude);
          const sheltersData = await fetchShelters(
            latitude,
            longitude,
            categoryId,
          );
          setShelters(sheltersData);
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
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          onSheltersPress(item.id),
            findShelter(
              item.shelterId,
              currentLocation.latitude,
              currentLocation.longitude,
            );
        }}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.phone}>{item.capacity}</Text>
        </View>
        <View style={styles.navigatorContainer}>
          <TouchableOpacity
            onPress={() => {
              onSheltersPress(item.id),
                findShelter(
                  item.shelterId,
                  currentLocation.latitude,
                  currentLocation.longitude,
                );
            }}>
            <Image
              source={require('../../../../assets/icons/Navigator.png')}
              style={styles.navigatorImage}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#666',
    marginBottom: 5,
    width: '90%',
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

  infoContainer: {
    justifyContent: 'space-between',
    width: '90%',
  },
});

export default ShelterInfoDetail;
