import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ShelterCategory = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>대피소</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ShelterInfoDetail')}>
          <Text style={styles.buttonTitle}>민방위 대피소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ShelterInfoDetail')}>
          <Text style={styles.buttonTitle}>지진 옥외 대피소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ShelterInfoDetail')}>
          <Text style={styles.buttonTitle}>무더위 쉼터</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#CED4DA',
  },
  categoryContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(178, 201, 219)',
    borderRadius: 8,
    width: 175,
    height: 80,
    margin: 10,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ShelterCategory;
