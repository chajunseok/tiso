/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import Map from './src/pages/Map';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import {BottomSheet, BottomSheetProps} from './src/pages/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isBackgroundDark, setIsBackgroundDark] = useState(isDarkMode); // 배경색 밝기 상태 추가
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const bottomSheetProps: BottomSheetProps = {
    modalVisible: true,
    setModalVisible: () => {
      // setModalVisible 함수 수정
      Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start(); // 아래로 이동하는 애니메이션 시작
      setIsBackgroundDark(true); // 배경색을 밝게 변경
    },
    panY: panY,
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={isBackgroundDark ? backgroundStyle : {}}>
        <Map />
        <BottomSheet {...bottomSheetProps} />
        {/* <Text style={styles.highlight}>HI</Text> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// const styles = StyleSheet.create({
//   highlight: {
//     fontWeight: '700',
//     color: 'red',
//   },
// });

export default App;
