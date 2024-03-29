import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {WebView} from 'react-native-webview';

const SafetyGuidelineDetail = ({route, navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
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
  // const [details, setDetails] = useState(null); //바꿔서 써 더미데이터 넣을게
  const [details, setDetails] = useState({
    title: '겨울철 안전 운전 요령',
    contents:
      '<p>겨울철 눈과 얼음길에서의 안전 운전을 위해 다음의 조치들을 취하시기 바랍니다:</p><ul><li>차량용 겨울 타이어 사용</li><li>속도 줄이기</li><li>안전거리 유지하기</li><li>제동 거리가 길어질 수 있으니 서행하기</li></ul><p>이 외에도 갑작스러운 날씨 변화에 대비하여 차량 내 비상 키트를 구비하는 것이 좋습니다.</p>',
  });

  // 사용 예시
  // details.contents를 사용하여 HTML 형식의 내용을 렌더링할 수 있습니다.

  const {title, videoId} = route.params || {};

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         'http://localhost:8080/tips/minor/tips_02',
  //       );
  //       const data = await response.json();
  //       setDetails(data.data.tip);
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  function onReady() {
    setIsReadyForRender(true); // 영상 준비 완료 시 상태 업데이트
  }

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <ScrollView>
        <YoutubePlayer
          style={styles.video}
          height={(screenWidth * 9) / 16} // 16:9 비율로 조절
          width={screenWidth}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
          onReady={onReady} // onReady 핸들러 추가
          webViewStyle={{
            opacity: 0.99,
            minHeight: 1,
          }}
          webViewProps={{
            androidLayerType: 'hardware',
          }}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{details.title}</Text>
          <View style={styles.webViewContainer}>
            <WebView
              originWhitelist={['*']}
              source={{
                html: `<div style="font-size: 30px; color: black;">${details.contents}</div>`,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  video: {
    flex: 1,
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
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
  detailsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  webViewContainer: {
    height: 200,
    width: '100%',
  },
});

export default SafetyGuidelineDetail;
