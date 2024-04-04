import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width: screenWidth} = Dimensions.get('window');
const buttonWidth = (screenWidth - 35) / 2;

const ShelterCategory = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '대피소 정보',
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Pretendard-ExtraBold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
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
    marginTop: 20,
  },
  button: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: '#ffffff',
    elevation: 3,
    width: buttonWidth,
    paddingVertical: 15,
    marginBottom: 15,
  },
  buttonTitle: {
    fontSize: 16,
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
