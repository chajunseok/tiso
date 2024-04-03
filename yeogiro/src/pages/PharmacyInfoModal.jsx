import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

const HospitalInfoModal = ({hospital, visible, onClose}) => {
  if (!hospital) {
    return null;
  }

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{hospital.place_name}</Text>
          <Text>{hospital.address_name}</Text>
          <Text>{hospital.phone}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
  },
  button: {
    marginTop: 20,
  },
  // 추가적인 스타일링...
});

export default HospitalInfoModal;
