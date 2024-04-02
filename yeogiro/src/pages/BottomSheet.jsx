import React, {
  useRef,
  useMemo,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CitiesProvider} from './Bottomsheet/CitiesContext';

import SystemSettingMain from './Bottomsheet/SystemSetting/SystemSettingMain';
import RegionalSettings from './Bottomsheet/SystemSetting/RegionalSettings/RegionalSettings';
import RegionalAdd from './Bottomsheet/SystemSetting/RegionalSettings/RegionalAdd';
import MessageTypeSettings from './Bottomsheet/SystemSetting/MessageTypeSettings/MessageTypeSettings';

import SafetyGuidelineMain from './Bottomsheet/SafetyGuideline/SafetyGuidelineMain';
import SafetyGuidelineDetail from './Bottomsheet/SafetyGuideline/SafetyGuidelineDetail';

import EmergencyEvacuation from './Bottomsheet/SafetyGuideline/SafetyCategory/EmergencyEvacuation';
import LifeSafety from './Bottomsheet/SafetyGuideline/SafetyCategory/LifeSafety';
import NaturalDisaster from './Bottomsheet/SafetyGuideline/SafetyCategory/NaturalDisaster';
import SocialDisaster from './Bottomsheet/SafetyGuideline/SafetyCategory/SocialDisaster';

import FacilitiesInfoMain from './Bottomsheet/FacilitiesInfo/FacilitiesInfoMain';
import ShelterCategory from './Bottomsheet/FacilitiesInfo/ShelterCategory';
import HospitalInfoDetail from './Bottomsheet/FacilitiesInfo/HospitalInfoDetail';
import PharmacyInfoDetail from './Bottomsheet/FacilitiesInfo/PharmacyInfoDetail';
import ShelterInfoDetail from './Bottomsheet/FacilitiesInfo/ShelterInfoDetail';

import Loading from './Loading';

import {useRecoilState} from 'recoil';
import {bottomSheetState} from '../state/atoms';

const Stack = createStackNavigator();
const MyBottomSheet = ({onFindPath}) => {
  const [bottomSheet, setBottomSheet] = useRecoilState(bottomSheetState);
  const bottomSheetRef = useRef(null);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(1);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const handleHalf = () => {
    setBottomSheet({isOpen: true, index: 1});
  };

  const handleAll = () => {
    setBottomSheet({isOpen: true, index: 2});
  };

  useEffect(() => {
    if (bottomSheet.isOpen) {
      bottomSheetRef.current?.snapToIndex(bottomSheet.index);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [bottomSheet]);

  const handleSheetChanges = useCallback(
    index => {
      setBottomSheet(current => ({...current, isOpen: index !== -1, index}));
    },
    [setBottomSheet],
  );

  const SettingsScreen = ({navigation}) => {
    useLayoutEffect(() => {
      navigation.setOptions({
        title: '메인 기능',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        headerTitleAlign: 'center',
      });
    }, [navigation]);

    async function handleFindPath() {
      if (onFindPath) {
        onFindPath();
      }
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'red'}]}
          onPress={handleFindPath}>
          <Text style={styles.buttonText}>최적의 길 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'lightgreen'}]}
          onPress={() => {
            handleHalf();
            navigation.navigate('FacilitiesInfoMain');
          }}>
          <Text style={styles.buttonText}>시설 정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'coral'}]}
          onPress={() => {
            handleHalf();
            navigation.navigate('SafetyGuidelineMain');
          }}>
          <Text style={styles.buttonText}>행동 요령</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'skyblue'}]}
          onPress={() => {
            handleHalf();
            navigation.navigate('SystemSettingMain');
          }}>
          <Text style={styles.buttonText}>환경 설정</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={bottomSheetIndex.index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <CitiesProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SettingsScreen"
            screenOptions={{animationEnabled: false}}>
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen
              name="SystemSettingMain"
              component={SystemSettingMain}
            />
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen
              name="MessageTypeSettings"
              component={MessageTypeSettings}
            />
            <Stack.Screen
              name="RegionalSettings"
              component={RegionalSettings}
            />
            <Stack.Screen name="RegionalAdd" component={RegionalAdd} />
            <Stack.Screen name="SafetyGuidelineMain">
              {props => (
                <SafetyGuidelineMain {...props} handleAll={handleAll} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="SafetyGuidelineDetail"
              component={SafetyGuidelineDetail}
            />
            <Stack.Screen name="NaturalDisaster" component={NaturalDisaster} />
            <Stack.Screen name="SocialDisaster" component={SocialDisaster} />
            <Stack.Screen name="LifeSafety" component={LifeSafety} />
            <Stack.Screen
              name="EmergencyEvacuation"
              component={EmergencyEvacuation}
            />
            <Stack.Screen
              name="FacilitiesInfoMain"
              component={FacilitiesInfoMain}
            />
            <Stack.Screen name="ShelterCategory" component={ShelterCategory} />
            <Stack.Screen
              name="HospitalInfoDetail"
              component={HospitalInfoDetail}
            />
            <Stack.Screen
              name="PharmacyInfoDetail"
              component={PharmacyInfoDetail}
            />
            <Stack.Screen
              name="ShelterInfoDetail"
              component={ShelterInfoDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CitiesProvider>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default MyBottomSheet;
