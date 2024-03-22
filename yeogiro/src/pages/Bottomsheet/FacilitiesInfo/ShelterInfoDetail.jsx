import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const ShelterInfoDetail = () => {
  const DATA = [
    {
      id: '1',
      title: '대피소 1',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '2',
      title: '대피소 2',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '3',
      title: '대피소 3',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '4',
      title: '대피소 4',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '5',
      title: '대피소 5',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '6',
      title: '대피소 6',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '7',
      title: '대피소 7',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '8',
      title: '대피소 8',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '9',
      title: '대피소 9',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '10',
      title: '대피소 10',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '11',
      title: '대피소 11',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
    {
      id: '12',
      title: '대피소 12',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      capacity: 1000,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.shelter}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 600}}>
          {item.title}
        </Text>
        <Text>{item.address}</Text>
        <Text>
          최대수용인원 : <Text style={{color: 'blue'}}>{item.capacity}명</Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{borderBottomWidth: 1, borderBottomColor: '#CED4DA'}}>
        <Text style={styles.containerTitle}>대피소 정보</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
  shelter: {
    borderBottomWidth: 1,
    borderBottomColor: '#CED4DA',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  containerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 25,
  },
});

export default ShelterInfoDetail;
