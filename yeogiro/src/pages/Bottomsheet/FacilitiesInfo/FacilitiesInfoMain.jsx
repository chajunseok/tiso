import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function FacilitiesInfoMain({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '시설 정보',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * 0.3;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
          onPress={() => navigation.navigate('ShelterCategory')}>
          <Text style={styles.buttonTitle}>대피소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
          onPress={() => navigation.navigate('HospitalInfoDetail')}>
          <Text style={styles.buttonTitle}>병원</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
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
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#CED4DA',
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
    backgroundColor: 'rgb(178, 201, 219)',
    borderRadius: 8,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FacilitiesInfoMain;
