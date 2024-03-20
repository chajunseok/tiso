import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PharmacyInfoDetail = () => {
  return (
    <View>
      <Text style={styles.text}>약국 정보</Text>
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

export default PharmacyInfoDetail;
