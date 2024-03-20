import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function FacilitiesInfoMain({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ShelterCategory')}>
          <Text style={styles.buttonTitle}>대피소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HospitalInfoDetail')}>
          <Text style={styles.buttonTitle}>병원</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PharmacyInfoDetail')}>
          <Text style={styles.buttonTitle}>약국</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#D9ACF5',
    borderRadius: 8,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FacilitiesInfoMain;
