import React, {useState, useCallback} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const SafetyGuidelineDetail = ({route}) => {
  const [playing, setPlaying] = useState(false);
  const {title, videoId} = route.params || {};

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {title}
        {videoId}
      </Text>
      <YoutubePlayer
        height={300}
        width={400}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  youtube: {
    width: 100,
    height: 50,
  },
});

export default SafetyGuidelineDetail;
