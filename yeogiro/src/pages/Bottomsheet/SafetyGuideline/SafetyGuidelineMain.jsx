import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

function SafetyGuidelineMain({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="SafetyCategory"
        onPress={() => navigation.navigate('SafetyCategory')}
      />
      <Button
        title="SafetyGuidelineDetail"
        onPress={() => navigation.navigate('SafetyGuidelineDetail')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SafetyGuidelineMain;
