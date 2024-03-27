import React, {useRef, useMemo, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {CitiesProvider} from './Bottomsheet/CitiesContext';

const MyBottomSheet = ({navigation}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <CitiesProvider>
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'red'}]}
            onPress={() => navigation.navigate('Loading')}>
            <Text style={styles.buttonText}>최적의 길 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'skyblue'}]}
            onPress={() => navigation.navigate('SystemSettingMain')}>
            <Text style={styles.buttonText}>환경 설정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'coral'}]}
            onPress={() => navigation.navigate('SafetyGuidelineMain')}>
            <Text style={styles.buttonText}>행동 요령</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'lightgreen'}]}
            onPress={() => navigation.navigate('FacilitiesInfoMain')}>
            <Text style={styles.buttonText}>시설 정보</Text>
          </TouchableOpacity>
        </View>
      </CitiesProvider>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default MyBottomSheet;
