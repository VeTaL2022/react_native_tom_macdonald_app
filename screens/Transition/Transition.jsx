import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import Video from 'react-native-video';

import backgroundVideo from '../../content/PexelsBackground.mp4';

export const Transition = () => {

  const navigation = useNavigation();
  const [isPreloading, setIsPreloading] = useState(false);

  const animatedValue1 = new Animated.Value(0);
  const animatedValue2 = new Animated.Value(0);
  const animatedValue3 = new Animated.Value(0);

  const animateText = () => {
    return Animated.loop(Animated.sequence([Animated.timing(animatedValue3, {
      toValue: 1, duration: 500, useNativeDriver: true,
    }), Animated.timing(animatedValue2, {
      toValue: 1, duration: 500, useNativeDriver: true,
    }), Animated.timing(animatedValue1, {
      toValue: 1, duration: 500, useNativeDriver: true,
    }), Animated.timing(animatedValue3, {
      toValue: 2, duration: 500, useNativeDriver: true, delay: 5000,
    }), Animated.timing(animatedValue2, {
      toValue: 2, duration: 500, useNativeDriver: true,
    }), Animated.timing(animatedValue1, {
      toValue: 2, duration: 500, useNativeDriver: true,
    })]), {
      iterations: -1,
    }).start();
  };


  const translateY1 = animatedValue1.interpolate({
    inputRange: [0, 1], outputRange: [-500, 1],
  });

  const translateY2 = animatedValue1.interpolate({
    inputRange: [0, 1], outputRange: [-500, 0],
  });

  const translateY3 = animatedValue1.interpolate({
    inputRange: [0, 1], outputRange: [-500, -1],
  });

  useEffect(() => {
  }, [animateText()]);

  return (<>
    {isPreloading && (<ActivityIndicator size={'large'} color={'gray'}
                                         style={{ backgroundColor: '#000', flex: 10 }} />)}
    <View style={styles.container}>

      < Video source={backgroundVideo}
              resizeMode={'cover'}
              repeat
              style={styles.backgroundVideo}
              onLoadStart={() => setIsPreloading(true)}
              onReadyForDisplay={() => setIsPreloading(false)}
      />

      {!isPreloading && (
        <View style={{ position: 'absolute' }}>

          <Animated.View style={[{ transform: [{ translateY: translateY1 }] }]}>
            <Pressable onPress={() => navigation.navigate('Artist')} style={styles.animatedText}>
              <Icon size={35} name={'person'} color={'lightgray'} />
              <Text style={styles.navigation}>Artist</Text>
            </Pressable>
          </Animated.View>

          <Animated.View style={[{ transform: [{ translateY: translateY2 }] }]}>
            <Pressable onPress={() => navigation.navigate('Tracks')} style={styles.animatedText}>
              <Icon size={35} name={'music-note'} color={'lightgray'} />
              <Text style={styles.navigation}>Tracks</Text>
            </Pressable>
          </Animated.View>

          <Animated.View style={[{ transform: [{ translateY: translateY3 }] }]}>
            <Pressable onPress={() => navigation.navigate('Albums')} style={styles.animatedText}>
              <Icon2 size={35} name={'albums'} color={'lightgray'} />
              <Text style={styles.navigation}>Albums</Text>
            </Pressable>
          </Animated.View>

        </View>)}

    </View>
  </>);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', flex: 1,
  }, animatedText: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 5, padding: 10, backgroundColor: '#000', borderRadius: 10,
  }, navigation: {
    fontSize: 24, color: 'white', textTransform: 'uppercase', marginLeft: 10,
  }, backgroundVideo: {
    height: '100%', width: '100%', opacity: 0.8,
  },
});
