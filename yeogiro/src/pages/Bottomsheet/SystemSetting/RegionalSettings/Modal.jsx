import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Map = () => {
  return (
    <View>
      <Text style={styles.text}>Modal</Text>
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
    fontFamily: 'Pretendard-Bold',
    color: 'black',
  },
});

export default Map;
