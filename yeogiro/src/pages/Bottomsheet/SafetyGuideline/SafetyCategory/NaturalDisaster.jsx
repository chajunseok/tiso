import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const disasterList = [
  {id: '1', title: '대설', videoId: 'Q4LePrtMeZ0'},
  {id: '2', title: '홍수'},
  {id: '3', title: '침수'},
  {id: '4', title: '해일'},
  {id: '5', title: '폭염'},
  {id: '6', title: '지진'},
  {id: '7', title: '한파'},
  {id: '8', title: '건조'},
  {id: '9', title: '호우'},
  {id: '10', title: '태풍'},
];

function NaturalDisaster({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '행동 요령',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('SafetyGuidelineDetail', {
          title: item.title,
          videoId: item.videoId,
        })
      }>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={require('../../../../../assets/icons/Next.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={disasterList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flatList: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default NaturalDisaster;
