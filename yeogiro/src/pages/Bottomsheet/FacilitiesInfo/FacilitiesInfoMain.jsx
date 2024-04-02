import React, {useLayoutEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function FacilitiesInfoMain({navigation}) {
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

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * 0.3;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
          onPress={() => navigation.navigate('ShelterCategory')}>
          <Image
            source={require('../../../../assets/icons/hospital.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonTitle}>대피소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
          onPress={() => navigation.navigate('HospitalInfoDetail')}>
          <Image
            source={require('../../../../assets/icons/hospital.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonTitle}>병원</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
          onPress={() => navigation.navigate('PharmacyInfoDetail')}>
          <Image
            source={require('../../../../assets/icons/pharmacy.png')}
            style={styles.icon3}
          />
          <Text style={styles.buttonTitle}>약국</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#CED4DA',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    // margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',

    // 버튼 그림자 효과
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  buttonTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
    color: '#282828',
    marginTop: 8,
  },
  icon: {
    width: 25,
    height: 33,
  },
  icon2: {
    width: 28,
    height: 32,
  },
  icon3: {
    width: 28,
    height: 32,
  },
});

export default FacilitiesInfoMain;
