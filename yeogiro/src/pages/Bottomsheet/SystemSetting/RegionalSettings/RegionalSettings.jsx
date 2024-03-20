// OtherScreen.js
import React from 'react';
import {View, Button} from 'react-native';

function RegionalSetting({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Modal" onPress={() => navigation.navigate('Modal')} />
      <Button
        title="RegionalAdd"
        onPress={() => navigation.navigate('RegionalAdd')}
      />
    </View>
  );
}

export default RegionalSetting;
