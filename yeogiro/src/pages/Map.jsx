import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  PermissionsAndroid,
  Platform,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, {Marker, Circle, Path} from 'react-native-nmap';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  bottomSheetState,
  pathDataState,
  hospitalState,
  pharmacyState,
  shelterState,
  emergencyState,
  loadingState,
  dangerAreaDataState,
} from '../state/atoms';
import HospitalInfoModal from './HospitalInfoModal';
import PharmacyinfoModal from './PharmacyInfoModal';
import ShelterinfoModal from './ShelterInfoModal';
import {
  selectedHospitalIdState,
  selectedPharmacyIdState,
  selectedFacilityIdState,
} from '../state/selectedAtom';
import Loading from './Loading';
import EmergencyModal from './EmergencyModal';

function MyMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initLocation, setInitLocation] = useState(null);
  const mapViewRef = useRef(null);
  const [isCenteredOnCurrentLocation, setIsCenteredOnCurrentLocation] =
    useState(false);
  const setBottomSheet = useSetRecoilState(bottomSheetState);

  const [hospitalModalVisible, setHospitalModalVisible] = useState(false);
  const [pharmacyModalVisible, setPharmacyModalVisible] = useState(false);
  const [shelterModalVisible, setShelterModalVisible] = useState(false);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const selectedHospitalId_1 = useRecoilValue(selectedHospitalIdState);

  const [selectedPharmacy, setselectedPharmacy] = useState(null);
  const [selectedPharmacyId, setselectedPharmacyId] = useState(null);
  const selectedPharmacyId_1 = useRecoilValue(selectedPharmacyIdState);

  const [selectedShelter, setSelectedShelter] = useState(null);
  const [selectedShelterId, setSelectedShelterId] = useState(null);
  const selectedShelterId_1 = useRecoilValue(selectedFacilityIdState);

  const hospitals = useRecoilValue(hospitalState);
  const pharmacys = useRecoilValue(pharmacyState);
  const shelters = useRecoilValue(shelterState);
  const isLoading = useRecoilValue(loadingState);
  const emergency = useRecoilValue(emergencyState);

  const pathData = useRecoilValue(pathDataState);
  const dangerAreaData = useRecoilValue(dangerAreaDataState);
  const polylineCoordinates = useMemo(() => {
    return (
      pathData?.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude,
      })) || []
    );
  }, [pathData]);

  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {
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
            getInitLocation();
            getMyLocation();
          } else {
            console.log('Location permission denied');
          }
        } else {
          getInitLocation();
          getMyLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (selectedHospitalId || selectedPharmacyId || selectedShelterId) {
      const interval = setInterval(() => {
        setBlink(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [selectedHospitalId, selectedPharmacyId, selectedShelterId]);

  useEffect(() => {
    if (hospitals && hospitals.length > 0 && currentLocation) {
      setIsCenteredOnCurrentLocation(true);
    }
  }, [hospitals]);

  useEffect(() => {
    if (pharmacys && pharmacys.length > 0 && currentLocation) {
      setIsCenteredOnCurrentLocation(true);
    }
  }, [pharmacys]);

  useEffect(() => {
    if (shelters && shelters.length > 0 && currentLocation) {
      setIsCenteredOnCurrentLocation(true);
    }
  }, [shelters]);

  useEffect(() => {}, [pathData]);

  const getInitLocation = () => {
    console.log('초기 위치');
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setInitLocation({latitude, longitude});
      },
      error => {
        console.warn(error.message);
      },
      {enableHighAccuracy: true, distanceFilter: 1},
    );
  };

  const getMyLocation = () => {
    console.log('실시간 감시');
    Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
      },
      error => {
        console.warn(error.message);
      },
      {enableHighAccuracy: true, distanceFilter: 1},
    );
  };

  const toggleLocationCenter = () => {
    if (isCenteredOnCurrentLocation) {
      setInitLocation(currentLocation);
    }
    setIsCenteredOnCurrentLocation(prevState => !prevState);
  };

  const onMarkerPress = hospital => {
    setSelectedHospitalId(hospital.id);
    setSelectedHospital(hospital);
    setHospitalModalVisible(true);
    setBottomSheet({isOpen: true, index: 0});
  };

  const onMarkerPress_1 = pharmacy => {
    setselectedPharmacyId(pharmacy.id);
    setselectedPharmacy(pharmacy);
    setPharmacyModalVisible(true);
    setBottomSheet({isOpen: true, index: 0});
  };

  const onMarkerPress_2 = shelter => {
    setSelectedShelterId(shelter.id);
    setSelectedShelter(shelter);
    setShelterModalVisible(true);
    setBottomSheet({isOpen: true, index: 0});
  };

  return (
    <View>
      <NaverMapView
        ref={mapViewRef}
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={false}
        center={
          isCenteredOnCurrentLocation
            ? (currentLocation || initLocation) && {
                ...currentLocation,
                zoom: 16,
              }
            : (initLocation || currentLocation) && {...initLocation, zoom: 16}
        }
        onTouch={() => {
          setIsCenteredOnCurrentLocation(false);
        }}>
        {pharmacys?.map((pharmacy, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(pharmacy.y),
              longitude: parseFloat(pharmacy.x),
            }}
            width={25}
            height={35}
            image={
              selectedPharmacyId_1 === pharmacy.id
                ? blink
                  ? require('../../assets/icons/pharmacy_select.png')
                  : require('../../assets/icons/pharmacy.png')
                : require('../../assets/icons/pharmacy.png')
            }
            onClick={() => onMarkerPress_1(pharmacy)}
          />
        ))}
        {hospitals?.map((hospital, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(hospital.y),
              longitude: parseFloat(hospital.x),
            }}
            width={30}
            height={35}
            image={
              selectedHospitalId_1 === hospital.id
                ? blink
                  ? require('../../assets/icons/hospital_select.png')
                  : require('../../assets/icons/hospital.png')
                : require('../../assets/icons/hospital.png')
            }
            onClick={() => onMarkerPress(hospital)}
          />
        ))}
        {shelters?.map((shelter, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(shelter.latitude),
              longitude: parseFloat(shelter.longitude),
            }}
            width={25}
            height={35}
            image={
              selectedShelterId_1 === shelter.id
                ? blink
                  ? require('../../assets/icons/shelter_select.png')
                  : require('../../assets/icons/shelter.png')
                : require('../../assets/icons/shelter.png')
            }
            onClick={() => onMarkerPress_2(shelter)}
          />
        ))}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            image={require('../../assets/icons/SubIcon.png')}
            width={30}
            height={30}
          />
        )}
        {polylineCoordinates.length > 0 && (
          <Path
            coordinates={polylineCoordinates}
            color="#009900"
            width={5}
            outlineColor="#009900"
            passedColor="yellow"
            passedOutlineColor="yellow"
          />
        )}
        {dangerAreaData && (
          <Circle
            coordinate={dangerAreaData.gps}
            color={'rgba(255,0,0,0.5)'}
            radius={dangerAreaData.radius}
          />
        )}
      </NaverMapView>
      <HospitalInfoModal
        hospital={selectedHospital}
        visible={hospitalModalVisible}
        onClose={() => setHospitalModalVisible(false)}
      />
      <ShelterinfoModal
        hospital={selectedShelter}
        visible={shelterModalVisible}
        onClose={() => setShelterModalVisible(false)}
      />
      <PharmacyinfoModal
        hospital={selectedPharmacy}
        visible={pharmacyModalVisible}
        onClose={() => setPharmacyModalVisible(false)}
      />
      {emergency.isVisible && <EmergencyModal message={emergency.message} />}
      <TouchableWithoutFeedback onPress={toggleLocationCenter}>
        <View
          style={[
            styles.locationButton,
            isCenteredOnCurrentLocation ? styles.locationButtonActive : null,
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
  locationButtonActive: {
    backgroundColor: '#6495ED',
  },
});

export default MyMap;
