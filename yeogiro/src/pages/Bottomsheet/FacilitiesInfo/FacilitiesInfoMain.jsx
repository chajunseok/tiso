import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

function FacilitiesInfoMain({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="FacilitiesCategory"
        onPress={() => navigation.navigate('FacilitiesCategory')}
      />
      <Button
        title="FacilitiesInfoDetail"
        onPress={() => navigation.navigate('FacilitiesInfoDetail')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default FacilitiesInfoMain;
