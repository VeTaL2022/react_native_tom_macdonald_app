import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Video from 'react-native-video';

import imageTom from '../../content/TomMacDonald.jpg';
import { playlist } from '../../content';

const randomVideo = { index: Math.floor(Math.random() * playlist.length) };

export const Home = () => {
  const navigation = useNavigation();

  const [video, setVideo] = useState(randomVideo);
  const [isPreloading, setIsPreloading] = useState(false);

  const animatedValue1 = new Animated.Value(0);
  const animatedValue2 = new Animated.Value(0);
  const animatedVideo = new Animated.Value(1.1);

  const animateText = () => {
    return Animated.loop(Animated.sequence([Animated.timing(animatedValue1, {
      toValue: 1, duration: 2000, delay: 2000, useNativeDriver: true,
    }), Animated.timing(animatedValue1, {
      toValue: 0, duration: 2000, useNativeDriver: true,
    }), Animated.timing(animatedValue2, {
      toValue: 1, duration: 2000, delay: 2000, useNativeDriver: true,
    }), Animated.timing(animatedValue2, {
      toValue: 0, duration: 2000, useNativeDriver: true,
    })]), {
      iterations: -1,
    }).start();
  };

  const animateVideo = () => {
    return Animated.loop(Animated.sequence([Animated.timing(animatedVideo, {
      toValue: 0.9, duration: 3000, useNativeDriver: true,
    }), Animated.timing(animatedVideo, {
      toValue: 1.1, duration: 3000, useNativeDriver: true,
    })]), { iterations: -1 }).start();
  };

  useEffect(() => {
  }, [animateText(), animateVideo()]);

  return (<View>
    <StatusBar backgroundColor={'black'} />

    <ImageBackground source={imageTom}
                     imageStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      {isPreloading && (<View>
        <ActivityIndicator animating color={'white'} size={'large'} style={styles.indicator} />
        <Text style={styles.text}>Tom MacDonald</Text>
      </View>)}

      <TouchableOpacity activeOpacity={0.5}
                        onPress={() => {
                          if (video.index < playlist.length - 1) {
                            setVideo(prevState => {
                              return { ...prevState, index: Math.floor(Math.random() * playlist.length) };
                            });
                          } else {
                            setVideo(prevState => {
                              return { ...prevState, index: 0 };
                            });
                          }
                        }}
                        onLongPress={() => navigation.navigate('Transition')}
      >
        <Animated.View style={[{ transform: [{ scale: animatedVideo }] }]}>
          <Video source={playlist[video.index]}
                 style={styles.backgroundVideo}
                 resizeMode={'cover'}
                 playInBackground={false}
            // muted

                 onLoadStart={() => setIsPreloading(true)}
                 onReadyForDisplay={() => setIsPreloading(false)}
                 onEnd={() => {
                   if (video.index < playlist.length - 1) {
                     setVideo(prevState => {
                       return { ...prevState, index: Math.floor(Math.random() * playlist.length) };
                     });
                   } else {
                     setVideo(prevState => {
                       return { ...prevState, index: 0 };
                     });
                   }
                 }}
          />
        </Animated.View>

        {isPreloading !== true && <View style={styles.tips}>
          <Animated.Text style={[styles.text1, { transform: [{ scale: animatedValue1 }] }]}>
            Touch > Change Video
          </Animated.Text>

          <Animated.Text style={[styles.text2, { transform: [{ scale: animatedValue2 }] }]}>
            Long Touch > Show Info
          </Animated.Text>
        </View>}

      </TouchableOpacity>

    </ImageBackground>
  </View>);
};
const styles = StyleSheet.create({
  backgroundVideo: {
    height: Dimensions.get('window').height, width: Dimensions.get('window').width, opacity: 0.7, borderRadius: 15,
  }, text: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2.6,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 40,
  }, tips: {
    height: Dimensions.get('window').height / 1.7, justifyContent: 'space-between',

    position: 'absolute', left: 0, right: 0, top: Dimensions.get('window').height / 5,
  }, text1: {
    textAlign: 'center', fontFamily: 'serif', fontSize: 20, color: 'lightyellow', textTransform: 'uppercase',
  }, text2: {
    textAlign: 'center', fontFamily: 'serif', fontSize: 20, color: 'lightblue', textTransform: 'uppercase',
  }, indicator: {
    position: 'absolute', top: Dimensions.get('window').height / 2.2, left: '45%',
  },
});

