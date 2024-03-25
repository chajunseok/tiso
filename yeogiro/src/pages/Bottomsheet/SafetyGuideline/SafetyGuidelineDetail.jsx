import React, {useState, useCallback, useRef} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {WebView} from 'react-native-webview';

const SafetyGuidelineDetail = ({route}) => {
  const [playing, setPlaying] = useState(false);
  const {title, videoId} = route.params || {};

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {title}
        {videoId}
      </Text>
      <WebView
        style={{height: 300}} // 높이를 원하는 대로 조절하세요
        javaScriptEnabled={true}
        source={{uri: `https://www.youtube.com/embed/${videoId}`}}
      />
      {/* <YoutubePlayer
        height={300}
        play={playing}`
        videoId={videoId}
        onChangeState={onStateChange}
      /> */}
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
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
});

export default SafetyGuidelineDetail;
