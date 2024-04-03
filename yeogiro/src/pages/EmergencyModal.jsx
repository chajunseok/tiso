import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextTicker from 'react-native-text-ticker';

const EmergencyModal = ({visible, onClose}) => {
  // console.log('isVisible : ', visible);
  if (!visible) return null;

  return (
    <View
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      style={{position: 'absolute', width: '85%', top: 12.6}}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <FastImage
            source={require('../../assets/icons/emergencyBell.gif')}
            style={styles.emergencyBell}
            resizeMode={FastImage.resizeMode.contain}
          />
          <TextTicker
            style={{width: 210, fontSize: 16, fontWeight: '600', color: 'red'}}
            loop
            animationType="auto"
            scrollSpeed={30}>
            긴급 재난 상황입니다! 최적의 길 찾기 버튼을 누르세요!
          </TextTicker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    width: '90%',
    height: 41,
  },
  emergencyBell: {
    width: 40,
    height: 40,
  },
});

export default EmergencyModal;
