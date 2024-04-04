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
  StyleSheet,
  Image,
  Dimensions,
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
          fontFamily: 'Pretendard-ExtraBold',
          color: '#282828',
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
    const screenWidth = Dimensions.get('window').width;
    const buttonWidth = screenWidth * 0.3;

    return (
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <View style={styles.verticalButtonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {width: screenWidth - 20, height: buttonWidth},
              ]}
              onPress={handleFindPath}>
              <View style={styles.buttonContent}>
                <Image
                  source={require('../../assets/icons/way.png')}
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>최적의 길 찾기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalButtonContainer}>
            <TouchableOpacity
              style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
              onPress={() => {
                handleHalf();
                navigation.navigate('FacilitiesInfoMain');
              }}>
              <View style={styles.buttonContent}>
                <Image
                  source={require('../../assets/icons/facility.png')}
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>시설 정보</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
              onPress={() => {
                handleHalf();
                navigation.navigate('SafetyGuidelineMain');
              }}>
              <View style={styles.buttonContent}>
                <Image
                  source={require('../../assets/icons/guideLine.png')}
                  style={styles.icon1}
                />
                <Text style={styles.buttonText}>행동 요령</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
              onPress={() => {
                handleHalf();
                navigation.navigate('SystemSettingMain');
              }}>
              <View style={styles.buttonContent}>
                <Image
                  source={require('../../assets/icons/setting.png')}
                  style={styles.icon2}
                />
                <Text style={styles.buttonText}>환경 설정</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    borderTopWidth: 1,
    borderTopColor: '#CED4DA',
  },
  buttonGroup: {
    marginTop: 20,
  },
  verticalButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#282828',
  },
  buttonContent: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 7,
  },
  icon1: {
    width: 50,
    height: 37,
    marginBottom: 7,
  },
  icon2: {
    width: 43,
    height: 40,
    marginBottom: 7,
  },
});

export default MyBottomSheet;
