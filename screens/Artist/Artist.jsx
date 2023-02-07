import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import RenderHTML from 'react-native-render-html';
import { useEffect, useState } from 'react';

import { ArtistLeaderBoard, ArtistSocialMedia } from '../../components';
import { artistService } from '../../services';

const id = 1191624;

export const Artist = () => {

  const [artist, setArtist] = useState({});
  const [description, setDescription] = useState(null);

  const { width } = useWindowDimensions();

  useEffect(() => {
    artistService.getDetails(id).then(({ data }) => setArtist(data.artist));
  }, []);

  const cutedDescription = {
    html: artist?.description?.html.slice(0, 116) + '...',
  };
  return (
    <>
      {artist.description ? (
        <ScrollView contentContainerStyle={styles.container}>
          <ImageBackground source={{ uri: artist.header_image_url }} style={styles.image} resizeMode={'cover'}
                           blurRadius={3}>
            <Pressable onPress={() => Linking.openURL(artist.url)} style={styles.avatar_image_press}>
              <Image source={{ uri: artist.image_url }}
                     style={styles.avatar_image} />
            </Pressable>
          </ImageBackground>

          <View style={styles.info}>
            <Text style={styles.text}>{artist.name}</Text>
            <Text style={{ fontSize: 16, color: 'lightgray', fontWeight: '600' }}>AKA: {artist.alternate_names}</Text>
            <Text style={{ fontSize: 16, color: 'gray', fontWeight: '600' }}>{artist.followers_count} Followers</Text>
          </View>

          <View style={styles.description}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: 'gray' }}>About "{artist.name}"</Text>

            {description === null ? (<>
              <RenderHTML source={cutedDescription} contentWidth={width} baseStyle={{ fontSize: 20, color: 'gray' }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 18, color: '#255EC1' }}
                      onPress={() => setDescription(artist.description)}>read more</Text>
                <Icon size={10} name={'angle-dobule-right'} color={'#255EC1'}
                      style={{ paddingLeft: 5, paddingTop: 4 }} />
              </View>
            </>) : (
              <RenderHTML source={description} contentWidth={width} baseStyle={{ fontSize: 20, color: 'gray' }} />)}

          </View>

          <ArtistLeaderBoard id={id} />
          <ArtistSocialMedia artist={artist} />
        </ScrollView>) : (
        <ActivityIndicator size={'large'} color={'gray'} style={{ flex: 1, backgroundColor: '#000' }} />)}
    </>);
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000', alignItems: 'center',
  }, image: {
    width: Dimensions.get('window').width + 200, height: 230, position: 'relative',
  }, text: {
    fontSize: 30, fontWeight: 'bold', color: 'white',
  }, description: {
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    margin: 5,
    flex: 1,
    borderRadius: 5,
    width: 370,
    alignSelf: 'center',
  }, backgroundVideo: {
    height: Dimensions.get('window').height, width: Dimensions.get('window').width, opacity: 0.6,
  },
  avatar_image_press: {
    position: 'absolute', bottom: -75, left: Dimensions.get('window').width / 2 + 20, borderRadius: 75,
  },
  avatar_image: {
    height: 150, width: 150, borderRadius: 75, borderWidth: 3, borderColor: 'white',
  },
  info: {
    alignItems: 'center', marginTop: 86, marginBottom: 20,
  },
});
