import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

function SafetyGuidelineMain({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.firstButton]}
          onPress={() => navigation.navigate('NaturalDisaster')}>
          <Text style={styles.buttonText}>자연재난</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondButton]}
          onPress={() => navigation.navigate('SocialDisaster')}>
          <Text style={styles.buttonText}>사회재난</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.spacing} />
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.firstButton]}
          onPress={() => navigation.navigate('LifeSafety')}>
          <Text style={styles.buttonText}>생활안전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondButton]}
          onPress={() => navigation.navigate('EmergencyEvacuation')}>
          <Text style={styles.buttonText}>비상대피</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  spacing: {
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    width: 130,
    height: 55,
    // paddingVertical: 20, //버튼 세로 길이
    // paddingHorizontal: 50, //버튼 가로 길이
    marginHorizontal: 15, // 버튼과 버튼 사이 간격 (가로)
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstButton: {
    backgroundColor: 'rgb(178, 201, 219)',
  },
  secondButton: {
    backgroundColor: 'rgb(178, 201, 219)',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SafetyGuidelineMain;
