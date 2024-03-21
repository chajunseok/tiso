// SafetyGuidelineDetail.jsx

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SafetyGuidelineDetail = ({route}) => {
  // route.params에 전달된 title이 있을 경우 가져와서 사용합니다.
  const {title} = route.params || {};

  return (
    <View style={styles.container}>
      {/* 가져온 title을 보여줍니다. */}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

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

export default SafetyGuidelineDetail;
