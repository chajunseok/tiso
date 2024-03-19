import React, {useCallback, useMemo, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomSheetMain from './BottomSheetMain';
import SystemSettingMain from './Bottomsheet/SystemSetting/SystemSettingMain';
import SafetyGuidelineMain from './Bottomsheet/SafetyGuideline/SafetyGuidelineMain';
import FacilitiesInfoMain from './Bottomsheet/FacilitiesInfo/FacilitiesInfoMain';

const MyBottomSheet = () => {
  const bottomSheetRef = useRef(null);
  const Stack = createStackNavigator();
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomSheetMain">
          <Stack.Screen name="BottomSheetMain" component={BottomSheetMain} />
          <Stack.Screen
            name="SystemSettingMain"
            component={SystemSettingMain}
          />
          <Stack.Screen
            name="SafetyGuidelineMain"
            component={SafetyGuidelineMain}
          />
          <Stack.Screen
            name="FacilitiesInfoMain"
            component={FacilitiesInfoMain}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyBottomSheet;
