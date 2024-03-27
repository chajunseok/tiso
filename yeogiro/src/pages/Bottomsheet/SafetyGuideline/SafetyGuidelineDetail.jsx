import React, {useState, useCallback, useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

function SafetyGuidelineDetail({route, navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '행동 요령',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  const [playing, setPlaying] = useState(false);
  const [isReadyForRender, setIsReadyForRender] = useState(false); // 상태 분리

  const {title, videoId} = route.params || {};

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  function onReady() {
    setIsReadyForRender(true);
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>{videoId}</Text> */}
      <YoutubePlayer
        height={250}
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
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SafetyGuidelineDetail;
