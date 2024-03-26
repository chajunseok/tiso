import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width: screenWidth} = Dimensions.get('window');
const buttonWidth = (screenWidth - 40) / 2; // 버튼의 가로 길이

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

function NaturalDisaster({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '자연 재난',
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
      style={[styles.item, {marginRight: 10}]}
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
        numColumns={2}
        contentContainerStyle={styles.flatListContent} // 가운데 정렬
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
  flatListContent: {
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderColor: 'rgb(178, 201, 219)',
    borderWidth: 2,
    borderRadius: 8,
    width: buttonWidth,
  },
  title: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});

export default NaturalDisaster;
