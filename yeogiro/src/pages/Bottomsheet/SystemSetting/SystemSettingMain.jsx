// SettingsScreen.js
import React from 'react';
import {View, Button, Text} from 'react-native';

function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Other Screen"
        onPress={() => navigation.navigate('RegionalSettings')}
      />
    </View>
  );
}

export default SettingsScreen;
