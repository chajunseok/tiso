import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';

const Loading = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SettingsScreen');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/main-loading2.gif')}
        style={styles.run}
      />
      <Text style={styles.text}>로딩 중...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
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
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  run: {
    width: 100,
    height: 100,
  },
});

export default Loading;
