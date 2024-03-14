// import React from 'react';
// import {View, Text, StyleSheet, Button} from 'react-native';

// // Import Bottom Sheet components
// import BottomSheet from '@gorhom/bottom-sheet';
// import FacilitiesInfoMain from './botton sheet/FacilitiesInfo/FacilitiesInfoMain';
// // import SafetyGuidelineMain from './botton sheet/SafetyGuideline/SafetyGuidelineMain';

// const BottomSheetExample = () => {
//   // Ref for bottom sheet
//   const bottomSheetRef = React.useRef<BottomSheet>(null);

//   // Snap points for bottom sheet
//   const snapPoints = ['25%', '50%', '90%'];

//   // Handle bottom sheet change
//   const handleSheetChange = (index: number) => {
//     console.log('handleSheetChange', index);
//   };

//   // Snap bottom sheet to index
//   const handleSnapPress = (index: number) => {
//     bottomSheetRef.current?.snapToIndex(index);
//   };

//   // Render
//   return (
//     <View style={styles.container}>
//       {/* Map component as background */}
//       <View style={styles.mapContainer}>
//         {/* Your map component goes here */}
//         <Text>Map Component</Text>
//       </View>
//       {/* Bottom Sheet */}
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={1}
//         snapPoints={snapPoints}
//         onChange={handleSheetChange}>
//         {/* FacilitiesInfoMain or SafetyGuidelineMain based on your requirement */}
//         <FacilitiesInfoMain />
//         {/* <SafetyGuidelineMain /> */}
//       </BottomSheet>
//       {/* Buttons for testing */}
//       <View style={styles.buttonsContainer}>
//         <Text style={styles.text}>Bottom Sheet</Text>
//         <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
//         <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
//         <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
//       </View>
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   mapContainer: {
//     flex: 1,
//     backgroundColor: '#f0f0f0', // Example background color
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default BottomSheetExample;

import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
// import {palette} from '../styles/ColorPalette';

export interface BottomSheetProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  children?: React.ReactNode;
  panY: Animated.Value; //App.tsx에서도 사용하려고
}

export const BottomSheet = ({
  modalVisible,
  setModalVisible,
  children,
  panY,
}: BottomSheetProps) => {
  // const screenHeight = Dimensions.get('screen').height;
  const screenHeight = 0;
  panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
    // extrapolate: 'clamp', //범위 밖으로 나가는 값을 제한
  });

  //바텀시트 초기 위치로 리셋하는 애니메이션
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  //바텀시트 화면 아래로 숨기는 애니메이션
  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300, //0.3초
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        //아래로 스와이프하고 스와이프 속도가 일정 값 이상일 때 모달 닫기
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          //그 외의 경우 바텀시트 초기 위치로
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible, resetBottomSheet]);

  //모달 닫기
  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <View style={styles.tapWrapper}>
            <View style={styles.top} />
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', //모달 배경색
  },
  background: {
    flex: 1,
  },
  top: {
    width: 50,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', //바텀시트 상단 스와이프 핸들
    borderRadius: 15,
  },
  tapWrapper: {
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    justifyContent: 'center',
    width: '100%',
  },
  bottomSheetContainer: {
    height: 500, //바텀시트 초기 높이
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', //바텀시트 배경색
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

export default BottomSheet;
