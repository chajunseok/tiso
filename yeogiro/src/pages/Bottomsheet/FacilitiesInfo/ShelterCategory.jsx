import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const shelterCategory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>대피소</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>민방위 대피소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>지진 옥외 대피소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>무더위 쉼터</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9ACF5',
    borderRadius: 8,
    width: 175,
    height: 80,
    margin: 10,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default shelterCategory;
