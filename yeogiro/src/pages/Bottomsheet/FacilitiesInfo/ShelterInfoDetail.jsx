import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ShelterInfoDetail = () => {
  return (
    <View>
      <Text style={styles.containerTitle}>대피소 정보</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginLeft: 10,
  },
});

export default ShelterInfoDetail;
