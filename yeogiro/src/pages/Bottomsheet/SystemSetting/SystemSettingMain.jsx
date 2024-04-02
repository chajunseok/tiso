import React, {useState, useLayoutEffect, useEffect} from 'react';
import {Switch} from 'react-native';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingsScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '환경 설정',
      headerTitleStyle: {
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily: 'Pretendard-ExtraBold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const toggleSwitch = async () => {
    setIsPushEnabled(previousState => !previousState);
    try {
      await AsyncStorage.setItem('isPushEnabled', (!isPushEnabled).toString());
      console.log(isPushEnabled);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadPushSettings = async () => {
      try {
        const value = await AsyncStorage.getItem('isPushEnabled');
        if (value !== null) {
          setIsPushEnabled(value === 'true');
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadPushSettings();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentbox}>
          <Text style={styles.title}>수신 유형 설정</Text>
          <Text style={styles.subtitle}>수신 유형을 변경합니다</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MessageTypeSettings')}>
          <Image
            source={require('../../../../assets/icons/Next.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.contentbox}>
          <Text style={styles.title}>수신 지역 설정</Text>
          <Text style={styles.subtitle}>원하는 지역을 추가합니다</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegionalSettings')}>
          <Image
            source={require('../../../../assets/icons/Next.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.contentbox}>
          <Text style={styles.title}>푸쉬 알람 설정</Text>
          <Text style={styles.subtitle}>알림 수신이 중단됩니다</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isPushEnabled ? '767577' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isPushEnabled}
            style={styles.switchStyle}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    marginTop: 10,
  },
  switchStyle: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
    marginRight: 5,
  },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffff',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#262626',
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
  },
  subtitle: {
    fontSize: 14,
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-Medium',
  },
  button: {
    backgroundColor: '#841584',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginTop: 10,
  },
});

export default SettingsScreen;
