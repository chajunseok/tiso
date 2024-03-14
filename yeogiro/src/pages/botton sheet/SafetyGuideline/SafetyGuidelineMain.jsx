import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SafetyGuidelineMain = () => {
  return (
    <View>
      <Text style={styles.text}>SafetyGuidelineMain</Text>
    </View>
  );
};

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
