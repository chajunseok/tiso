// OtherScreen.js
import React from 'react';
import {View, Button, Text} from 'react-native';

function OtherScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Other Screen</Text>
      <Button
        title="Back to Settings Screen"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default OtherScreen;
