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
import LinearGradient from 'react-native-linear-gradient';

const {width: screenWidth} = Dimensions.get('window');
const buttonWidth = (screenWidth - 40) / 2; // 버튼 가로 길이

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
  // 제목과 사진을 함께 보여주는 컴포넌트 반환
  const renderHeaderTitle = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>재난 안전</Text>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle, // 제목과 사진을 함께 보여주는 컴포넌트를 헤더 타이틀로
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.item, {marginLeft: 5, marginRight: 5}]}
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
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../../assets/images/NaturalDisaster.jpg')}
            style={styles.headerImage}
          />
          <LinearGradient
            colors={[
              // 위로 밝아지기
              // 'rgba(255,255,255,1)',
              // 'rgba(255,255,255,0.6)',
              // 'rgba(255,255,255,0.3)',
              // 'rgba(0,0,0,0.5)',
              // 'rgba(0,0,0,0.6)',

              //아래로 밝아지기
              // 'rgba(0,0,0,0.3)',
              'rgba(255,255,255, 0.01)',
              'rgba(255,255,255,1)',
            ]} // 그라데이션
            style={styles.gradient}
          />
        </View>
        <FlatList
          data={disasterList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.flatList}
          numColumns={2}
          contentContainerStyle={styles.flatListContent} // 가운데 정렬
        />
      </View>
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
  headerContainer: {
    alignItems: 'center',
  },
  headerImage: {
    height: 350,
    resizeMode: 'contain',
    zIndex: -1, // 뒤로 가도록 설정
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
  gradient: {
    ...StyleSheet.absoluteFillObject, // 사진과 같은 크기로 전체를 채우기
  },
  imageContainer: {
    marginBottom: 10, //사진이랑 아래 버튼 간격
    // position: 'relative', // 그라데이션과 겹치게
  },
});

export default NaturalDisaster;
