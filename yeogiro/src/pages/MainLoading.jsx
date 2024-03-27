import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const Loading = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../../assets/icons/logo.png')}
        style={styles.run}
        resizeMode={FastImage.resizeMode.contain}
      />
      <FastImage
        source={require('../../assets/icons/tiso.gif')}
        style={styles.run}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  run: {
    width: 300,
    height: 300,
  },
  load: {
    width: 200,
    height: 100,
  },
});

export default Loading;
