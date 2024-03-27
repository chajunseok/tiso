import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const Loading = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../../assets/icons/main-loading2.gif')}
        style={styles.run}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.text}>로딩 중</Text>
      <FastImage
        source={require('../../assets/icons/Ellipsis-1s-200px.gif')}
        style={styles.load}
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
