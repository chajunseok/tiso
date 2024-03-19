import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SystemSettingMain from './botton sheet/SystemSetting/SystemSettingMain';
import RegionalSettings from './botton sheet/SystemSetting/RegionalSettings/RegionalSettings';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen name="Settings" component={SystemSettingMain} />
        <Stack.Screen name="RegionalSettings" component={RegionalSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
