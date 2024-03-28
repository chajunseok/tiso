import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

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
  const [details, setDetails] = useState(null); //api용

  const {title, videoId} = route.params || {};

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  // const data = [
  //   {
  //     tip: {
  //       minorCode: 'S1',
  //       codeName: '대설',
  //       contents: '대설에 관한 내용이 들어갑니다.',
  //     },
  //   },
  // ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/tips/minor/tips_02',
        );
        const data = await response.json();
        setDetails(data.data.tip);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  function onReady() {
    setIsReadyForRender(true); // 영상 준비 완료 시 상태 업데이트
  }

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <View style={styles.container}> */}
        {/* <Text style={styles.text}>{videoId}</Text> */}
        <YoutubePlayer
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
            androidLayerType: isReadyForRender ? 'hardware' : 'software',
          }}
        />
        <Text style={styles.title}>{title}</Text>
        {details ? (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>상세 내용</Text>
            <Text
              style={styles.detailsText}
              dangerouslySetInnerHTML={{__html: details.contents}}></Text>
          </View>
        ) : (
          <Text>
            핵심 행동요령 대설은 짧은 시간에 급격히 눈이 쌓이게 되므로 눈사태,
            교통 혼잡, 쌓인 눈으로 인한 시설물 붕괴 등의 피해가 발생될 수
            있습니다.
          </Text>
        )}
        {/* </View> */}
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
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: 'black',
  },
});

export default SafetyGuidelineDetail;
