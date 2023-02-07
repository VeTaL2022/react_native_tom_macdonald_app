import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import { useEffect, useState } from 'react';

import { songService } from '../../services';

export const TrackDetails = () => {

    const navigation = useNavigation();
    const { params } = useRoute();
    const { trackId } = params;

    const { width } = useWindowDimensions();

    const [track, setTrack] = useState({});
    const [lyrics, setLyrics] = useState(null);
    const [recommendations, setReccomendations] = useState({});

    useEffect(() => {
      songService.getDetails(trackId).then(({ data }) => setTrack(data.song));
      songService.getRecommendations(trackId).then(({ data }) => setReccomendations(data.song_recommendations.recommendations));
    }, [trackId]);

    const getLyrics = () => songService.getLyrics(trackId).then(({ data }) => setLyrics(data.lyrics.lyrics));
    const hideLyrics = () => setLyrics(null);


    const date = new Date(track?.release_date);
    const fullDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const Recommended_Track = ({ recommended_song }) => {
      return (
        <View style={styles.child_container}>
          <Pressable onPress={() => navigation.push('TrackDetails', { trackId: recommended_song.id })}>
            <Image source={{ uri: recommended_song.song_art_image_thumbnail_url }}
                   style={{ width: 50, height: 50, alignSelf: 'center' }} />

            {recommended_song.title.length > 10 ? (
              <Text style={{
                fontSize: 13,
                textAlign: 'center',
                color: 'lightgray',
              }}>{recommended_song.title.slice(0, 10)}...</Text>
            ) : <Text style={{ fontSize: 13, textAlign: 'center', color: 'lightgray' }}>{recommended_song.title}</Text>}

          </Pressable>
        </View>
      );
    };

    return (
      <>
        {track.header_image_url ? (
          <>
            <ScrollView style={{ backgroundColor: '#000' }}>
              <View style={styles.container}>

                <Pressable onPress={() => Linking.openURL(track.apple_music_player_url)}>
                  <Image source={{ uri: track.header_image_url }} style={styles.image} />
                </Pressable>

                {track.youtube_url ? (<Text onPress={() => Linking.openURL(track.youtube_url)} style={{ color: 'gray' }}>Watch
                  Video</Text>) : null}

                <View style={styles.text}>
                  <Text style={styles.full_title}>{track.full_title}</Text>
                  {!lyrics ? (
                      <Pressable onPress={getLyrics} style={styles.button}><Text style={{color: 'black'}}>SHOW LYRICS</Text></Pressable>)
                    : (
                      <Pressable onPress={hideLyrics} style={styles.button}><Text style={{color: 'black'}}>HIDE LYRICS</Text></Pressable>)
                  }
                  <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    {lyrics?.body && (
                      <RenderHTML source={lyrics.body} contentWidth={width} baseStyle={{ color: 'lightgray', }} />)}
                  </View>
                </View>

                {!lyrics && track.release_date !== null && (
                  <Text style={styles.release}>Released {fullDate}</Text>
                )}
              </View>

            </ScrollView>

            {lyrics === null && (
              <View style={{ height: 110, backgroundColor: '#1A1110' }}>
                <Text
                  style={styles.recommended_text}>Recommendations</Text>
                <FlatList data={recommendations}
                          renderItem={({ item }) => <Recommended_Track recommended_song={item.recommended_song} />}
                          contentContainerStyle={{ justifyContent: 'space-around', flexDirection: 'row' }} />
              </View>
            )}

          </>
        ) : <ActivityIndicator size={'large'} color={'gray'} style={{ backgroundColor: '#000', flex: 1 }} />}
      </>);
  }
;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: Dimensions.get('window').height - 180,
    position: 'relative',
  }, image: {
    width: 330, height: 330,
  }, text: {
    marginTop: 5, alignItems: 'center',
  }, button: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
  release: {
    color: 'gray',
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  child_container: {
    width: 100,
    maxHeight: 100,
    alignItems: 'center',
  },
  full_title: {
    fontSize: 18, textAlign: 'center', color: 'white',
  },
  recommended_text: {
    textAlign: 'center', fontSize: 20, color: 'white', marginBottom: 5
  }
});
