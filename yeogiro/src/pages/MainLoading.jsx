import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const Loading = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../../assets/icons/tiso.gif')}
        style={styles.tiso}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(251, 251, 251)',
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  tiso: {
    width: '100%',
    height: '100%',
  },
});

export default Loading;
