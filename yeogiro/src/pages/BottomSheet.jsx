import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SystemSettingMain from './botton sheet/SystemSetting/SystemSettingMain';
import RegionalSettings from './botton sheet/SystemSetting/RegionalSettings/RegionalSettings';

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
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="Settings" component={SystemSettingMain} />
            <Stack.Screen
              name="RegionalSettings"
              component={RegionalSettings}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
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
