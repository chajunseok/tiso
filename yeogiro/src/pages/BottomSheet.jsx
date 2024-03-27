import React, {useRef, useMemo, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
// import SafetyCategory from './Bottomsheet/SafetyGuideline/SafetyCategory';
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

const Stack = createStackNavigator();

const MyBottomSheet = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const SettingsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'red'}]}
          onPress={() => navigation.navigate('Loading')}>
          <Text style={styles.buttonText}>최적의 길 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'skyblue'}]}
          onPress={() => navigation.navigate('SystemSettingMain')}>
          <Text style={styles.buttonText}>환경 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'coral'}]}
          onPress={() => navigation.navigate('SafetyGuidelineMain')}>
          <Text style={styles.buttonText}>행동 요령</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'lightgreen'}]}
          onPress={() => navigation.navigate('FacilitiesInfoMain')}>
          <Text style={styles.buttonText}>시설 정보</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <CitiesProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SettingsScreen"
            screenOptions={{animationEnabled: false}}>
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            {/* 시스템 설정 메인 화면 */}
            <Stack.Screen
              name="SystemSettingMain"
              component={SystemSettingMain}
            />
            <Stack.Screen
              name="Loading"
              component={Loading}
            />
            {/* 메시지 수신 유형 설정 화면 */}
            <Stack.Screen
              name="MessageTypeSettings"
              component={MessageTypeSettings}
            />
            {/* 지역 설정 화면 */}
            <Stack.Screen
              name="RegionalSettings"
              component={RegionalSettings}
            />
            {/* 지역 추가 화면 */}
            <Stack.Screen name="RegionalAdd" component={RegionalAdd} />

            {/* 행동 요령 메인 화면 */}
            <Stack.Screen
              name="SafetyGuidelineMain"
              component={SafetyGuidelineMain}
            />
            {/* 행동 요령 상세 화면 */}
            <Stack.Screen
              name="SafetyGuidelineDetail"
              component={SafetyGuidelineDetail}
            />
            {/* 행동 요령 카테고리 화면 */}
            {/* <Stack.Screen name="SafetyCategory" component={SafetyCategory} /> */}
            <Stack.Screen name="NaturalDisaster" component={NaturalDisaster} />
            <Stack.Screen name="SocialDisaster" component={SocialDisaster} />
            <Stack.Screen name="LifeSafety" component={LifeSafety} />
            <Stack.Screen
              name="EmergencyEvacuation"
              component={EmergencyEvacuation}
            />

            {/* 시설 정보 메인 화면 */}
            <Stack.Screen
              name="FacilitiesInfoMain"
              component={FacilitiesInfoMain}
            />
            {/* 시설 정보 카테고리 화면 */}
            <Stack.Screen name="ShelterCategory" component={ShelterCategory} />
            {/* 시설 정보 상세 화면 */}
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
