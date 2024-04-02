import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  useWindowDimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {FlatList} from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';

const SafetyGuidelineDetail = ({route, navigation}) => {
  const [playing, setPlaying] = useState(false);
  const [details, setDetails] = useState([]);
  const {title, videoId} = route.params || {};

  const {width} = useWindowDimensions();

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily: 'Pretendard-Bold',
        marginBottom: 5,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation, title]);

  useEffect(() => {
    if (route.params && route.params.api) {
      fetch(`http://tiso.run:8000/tips/${route.params.api}`) // 이전에 클릭한 버튼의 타이틀과 연결된 API 호출
        .then(response => response.json())
        .then(data => {
          const matchedTips = data.data.tips.filter(
            tip => tip.code === route.params.api,
          );
          setDetails(matchedTips);
        })
        .catch(error => console.error('Error fetching data: ', error));
    }
  }, [route.params]);

  const onStateChange = state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  };

  const onReady = () => {
    setPlaying(true);
  };

  const renderDetailItem = ({item}) => (
    <View style={styles.detailsContainer}>
      {/* title이 HTML 형식의 문자열이 아니라면 Text 컴포넌트 사용 */}
      {typeof item.title === 'string' ? (
        <Text style={styles.detailsTitle}>{item.title}</Text>
      ) : (
        <HTML contentWidth={width} source={{html: item.title}} />
      )}
      <HTML contentWidth={width} source={{html: item.contents}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <YoutubePlayer
        style={styles.video}
        height={(Dimensions.get('window').width * 9) / 16}
        width={Dimensions.get('window').width}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        onReady={onReady}
        webViewStyle={{
          opacity: 0.99,
          minHeight: 1,
        }}
        webViewProps={{
          androidLayerType: 'hardware',
        }}
      />
      <FlatList
        data={details}
        style={styles.flatList}
        renderItem={renderDetailItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  flatList: {
    padding: 10,
  },
  video: {
    flex: 1,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
    marginBottom: 10,
  },
});

export default SafetyGuidelineDetail;
