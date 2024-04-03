import React, {useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useCities} from '../../CitiesContext';

function RegionalAdd({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '환경 설정',
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Pretendard-ExtraBold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const {addCity, addedCities} = useCities();
  const cities = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전북특별자치도',
    '경상북도',
    '경상남도',
    '제주특별자치도',
  ];

  const handleAddCity = city => {
    addCity(city);
    // console.log(city + ' 추가하기 버튼이 눌렸습니다.');
  };

  const isCityAdded = city => addedCities.includes(city);
  const renderCity = ({item}) => (
    <View style={styles.cityContainer}>
      <Text style={styles.cityName}>{item}</Text>
      <TouchableOpacity
        style={[styles.addButton, isCityAdded(item) && styles.buttonDisabled]}
        onPress={() => handleAddCity(item)}
        disabled={isCityAdded(item)}>
        <Text style={styles.addButtonText}>
          {isCityAdded(item) ? '이미 추가됨' : '추가하기'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentbox}>
          <Text style={styles.title}>수신 지역 설정</Text>
          <Text style={styles.subtitle}>원하는 지역을 추가합니다</Text>
        </View>
      </View>

      <FlatList
        data={cities}
        renderItem={renderCity}
        keyExtractor={(item, index) => index.toString()}
      />
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
    fontFamily: 'Pretendard-Bold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
  contentbox: {
    marginBottom: 20,
  },
  cityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  cityName: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#262626',
  },
  addButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#5073B8',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
});

export default RegionalAdd;
