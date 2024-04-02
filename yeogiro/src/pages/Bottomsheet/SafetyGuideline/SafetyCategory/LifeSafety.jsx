import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const {width: screenWidth} = Dimensions.get('window');
const buttonWidth = (screenWidth - 40) / 2; // 버튼의 가로 길이

const disasterList = [
  {id: '1', title: '심폐소생술', api: 'D15', videoId: 'poJdxwE6qlc'},
  {id: '2', title: '식중독', api: 'D16', videoId: '745JF_jUEfo'},
  {id: '3', title: '산행 안전사고', api: 'D17', videoId: '6ANv2UtAQRk'},
  {id: '4', title: '승강기 안전사고', api: 'D18', videoId: '2mbWvX7n89g'},
];

function LifeSafety({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '생활 안전',
      headerTitleStyle: {
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily: 'Pretendard-ExtraBold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.item, {marginLeft: 5, marginRight: 5}]}
      onPress={() =>
        navigation.navigate('SafetyGuidelineDetail', {
          title: item.title,
          api: item.api,
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
      <View style={styles.imageContainer}>
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

        <Image
          source={require('../../../../../assets/images/LifeSafety.png')}
          style={styles.headerImage}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  flatList: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginBottom: 10,
    // borderColor: 'rgb(178, 201, 219)',
    borderColor: '#E9E9E9',
    borderWidth: 2,
    borderRadius: 8,
    width: buttonWidth,
  },
  title: {
    fontSize: 18,
    color: '#333333',
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-SemiBold',
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // 사진과 같은 크기로 전체를 채우기
    height: 290,
  },
  imageContainer: {
    marginBottom: 10, //사진이랑 아래 버튼 간격
    // position: 'relative', // 그라데이션과 겹치게
  },
  headerImage: {
    height: 280,
    resizeMode: 'contain',
    zIndex: -1, // 뒤로 가도록 설정
  },
});

export default LifeSafety;
