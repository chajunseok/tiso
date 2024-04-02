import React, {useState, useLayoutEffect} from 'react';
import {Switch} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';

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

  const [isEmergencyEnabled, setIsEmergencyEnabled] = useState(false);
  const [isSafetyEnabled, setIsSafetyEnabled] = useState(false);

  const toggleEmergencySwitch = () =>
    setIsEmergencyEnabled(previousState => !previousState);
  const toggleSafetySwitch = () =>
    setIsSafetyEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.contentbox}>
        <Text style={styles.title}>수신 유형 설정</Text>
        <Text style={styles.subtitle}>수신 유형을 변경합니다</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.contentbox}>
          <Text style={styles.title}>긴급 재난 문자 설정</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEmergencyEnabled ? '767577' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleEmergencySwitch}
            value={isEmergencyEnabled}
            style={styles.switchStyle}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentbox}>
          <Text style={styles.title}>안전 안내 문자 설정</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isSafetyEnabled ? '767577' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSafetySwitch}
            value={isSafetyEnabled}
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
    marginTop: -5,
  },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffff',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    color: '#262626',
    fontFamily: 'Pretendard-Bold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
  contentbox: {
    marginBottom: 20,
  },
});

export default SettingsScreen;
