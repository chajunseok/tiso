import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width: screenWidth} = Dimensions.get('window');
const buttonWidth = (screenWidth - 35) / 2; // 버튼 가로 길이

const ShelterCategory = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '시설 정보',
      headerTitleStyle: {
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily: 'Pretendard-ExtraBold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  // const screenWidth = Dimensions.get('window').width;
  // const buttonWidth = screenWidth * 0.45;
  // const buttonHeight = buttonWidth * 0.4;
  // const buttonMargin = (screenWidth - buttonWidth * 2) / 4;

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>대피소</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              // width: buttonWidth,
              // height: buttonHeight,
              // margin: buttonMargin,
              // marginBottom: buttonMargin,
              marginLeft: 5,
              marginRight: 5,
            },
          ]}
          onPress={() =>
            navigation.navigate('ShelterInfoDetail', {categoryId: 'S1'})
          }>
          <Text style={styles.buttonTitle}>민방위 대피소</Text>
          <Text style={styles.buttonSubTitle}>민방위 사태시 사용되는 장소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              // width: buttonWidth,
              // height: buttonHeight,
              // margin: buttonMargin,
              marginLeft: 5,
              marginRight: 5,
            },
          ]}
          onPress={() =>
            navigation.navigate('ShelterInfoDetail', {categoryId: 'S2'})
          }>
          <Text style={styles.buttonTitle}>지진 옥외 대피소</Text>
          <Text style={styles.buttonSubTitle}>지진 시 안전한 대피 장소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              // width: buttonWidth,
              // height: buttonHeight,
              // margin: buttonMargin,
              marginLeft: 5,
              marginRight: 5,
            },
          ]}
          onPress={() =>
            navigation.navigate('ShelterInfoDetail', {categoryId: 'S3'})
          }>
          <Text style={styles.buttonTitle}>무더위 쉼터</Text>
          <Text style={styles.buttonSubTitle}>무더위 시 대피 쉼터</Text>
        </TouchableOpacity>
      </View>
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
  categoryContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5,
  },
  containerTitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-Medium',
    // color: 'black',
    marginHorizontal: 20,
    marginVertical: 25,
  },
  button: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    paddingLeft: 10,
    paddingTop: 10,

    // alignItems: 'center',
    // justifyContent: 'center',

    // 버튼 그림자 효과
    backgroundColor: '#ffffff',
    elevation: 3,

    width: buttonWidth,

    paddingVertical: 15,
    // paddingHorizontal: 20,
    marginBottom: 15,
  },
  buttonTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
    color: '#282828',
  },
  buttonSubTitle: {
    paddingTop: 8,
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
  },
});

export default ShelterCategory;
