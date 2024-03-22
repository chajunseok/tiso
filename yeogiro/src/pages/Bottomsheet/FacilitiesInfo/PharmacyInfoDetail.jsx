import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const HospitalInfoDetail = () => {
  const DATA = [
    {
      id: '1',
      title: '약국 1',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '2',
      title: '약국 2',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '3',
      title: '약국 3',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '4',
      title: '약국 4',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '5',
      title: '약국 5',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '6',
      title: '약국 6',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '7',
      title: '약국 7',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '8',
      title: '약국 8',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '9',
      title: '약국 9',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '10',
      title: '약국 10',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '11',
      title: '약국 11',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
    {
      id: '12',
      title: '약국 12',
      address: '대전 서구 청사로 128 칼릭스 빌딩 5-8층 (월평동)',
      telephone: '042-123-4567',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.pharmacy}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 600}}>
          {item.title}
        </Text>
        <Text>{item.address}</Text>
        <Text style={{color: 'blue'}}>{item.telephone}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{borderBottomWidth: 1, borderBottomColor: '#CED4DA'}}>
        <Text style={styles.containerTitle}>약국 정보</Text>
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
  pharmacy: {
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

export default HospitalInfoDetail;
