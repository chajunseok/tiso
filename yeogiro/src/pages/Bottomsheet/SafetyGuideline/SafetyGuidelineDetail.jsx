import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const SafetyGuidelineDetail = ({route}) => {
  const [playing, setPlaying] = useState(false);
  const [isReadyForRender, setIsReadyForRender] = useState(false); // 상태 분리

  const {title, videoId} = route.params || {};

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  function onReady() {
    setIsReadyForRender(true); // 영상 준비 완료 시 상태 업데이트
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {title} {videoId}
      </Text>
      <YoutubePlayer
        height={300}
        width={400}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        onReady={onReady} // onReady 핸들러 추가
        webViewStyle={{
          opacity: isReadyForRender ? 1 : 0, // 준비 상태에 따라 투명도 조정
        }}
        webViewProps={{
          androidLayerType: isReadyForRender ? 'hardware' : 'software',
        }}
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
});

export default SafetyGuidelineDetail;
