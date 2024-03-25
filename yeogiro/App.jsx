import React from 'react';
import Map from './src/pages/Map';
import BottomSheet from './src/pages/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Map" component={Map} />
    //     <Stack.Screen name="BottomSheet" component={BottomSheet} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <GestureHandlerRootView>
      <Map />
      {/* <BottomSheet /> */}
    </GestureHandlerRootView>
  );
}

export default App;
