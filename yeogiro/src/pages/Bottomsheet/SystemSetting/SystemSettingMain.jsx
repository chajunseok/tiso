// SettingsScreen.js
import React from 'react';
import {View, Button} from 'react-native';

function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="MessageTypeSettings"
        onPress={() => navigation.navigate('MessageTypeSettings')}
      />
      <Button
        title="RegionalSettings"
        onPress={() => navigation.navigate('RegionalSettings')}
      />
    </View>
  );
}

export default SettingsScreen;
