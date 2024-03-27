import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function SafetyGuidelineMain({navigation}) {
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

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = screenWidth * 0.4;

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
          onPress={() => navigation.navigate('NaturalDisaster')}>
          <Text style={styles.buttonText}>자연 재난</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
          onPress={() => navigation.navigate('SocialDisaster')}>
          <Text style={styles.buttonText}>사회 재난</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
          onPress={() => navigation.navigate('LifeSafety')}>
          <Text style={styles.buttonText}>생활 안전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {width: buttonWidth, height: buttonWidth}]}
          onPress={() => navigation.navigate('EmergencyEvacuation')}>
          <Text style={styles.buttonText}>비상 대피</Text>
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(178, 201, 219)',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SafetyGuidelineMain;
