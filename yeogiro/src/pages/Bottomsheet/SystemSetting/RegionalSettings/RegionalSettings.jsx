import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useCities} from '../../CitiesContext';

function RegionalSetting({navigation}) {
  const {addedCities, removeCity} = useCities();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '환경 설정',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentbox}>
          <Text style={styles.title}>수신 지역 설정</Text>
          <Text style={styles.subtitle}>원하는 지역을 추가합니다</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RegionalAdd')}>
          <Text style={styles.buttonText}>지역 추가</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cityList}>
        {addedCities.map((city, index) => (
          <View key={index} style={styles.cityItem}>
            <Text style={styles.cityName}>{city}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeCity(city)}>
              <Text style={styles.removeButtonText}>삭제</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffff',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#262626',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgb(178, 201, 219)',
    borderRadius: 5,
    marginTop: -10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cityName: {
    fontSize: 18,
    color: '#262626',
    paddingVertical: 5,
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 10,
  },
});

export default RegionalSetting;
