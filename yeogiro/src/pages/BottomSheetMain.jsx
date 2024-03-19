// SettingsScreen.js
import React from 'react';
import {View, Button, Text} from 'react-native';

function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Navbar</Text>
      <Button
        title="SystemSettingMain"
        onPress={() => navigation.navigate('SystemSettingMain')}
      />
      <Button
        title="SafetyGuidelineMain"
        onPress={() => navigation.navigate('SafetyGuidelineMain')}
      />
      <Button
        title="FacilitiesInfoMain"
        onPress={() => navigation.navigate('FacilitiesInfoMain')}
      />
    </View>
  );
}

export default SettingsScreen;
