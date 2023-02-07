import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  LogBox,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useEffect, useState } from 'react';

import { albumService, artistService } from '../../services';

export const AlbumDetails = () => {

  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  let [albums, setAlbums] = useState([]);

  const navigation = useNavigation();
  const { params } = useRoute();
  const { albumId } = params;

  useEffect(() => {
    albumService.getDetails(albumId).then(({ data }) => setAlbum(data.album));
    albumService.getSongs(albumId).then(({ data }) => setTracks(data.album_appearances));
    artistService.getAlbums(1191624).then(({ data }) => setAlbums(data.albums));
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [albumId]);

  const date = new Date(album?.release_date);
  const fullDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const Track = ({ song }) => {
    return (
      <View>
        <Pressable style={styles.track_container}
                   onPress={() => navigation.navigate('TrackDetails', { trackId: song.id })}>
          <Image source={{ uri: song.song_art_image_thumbnail_url }} style={styles.track_image} />

          <View style={styles.text}>
            {song.title.length > 19 ? (
                <Text style={{ fontSize: 17, color: 'white' }}>{song.title.slice(0, 19)}...</Text>
              ) :
              (
                <Text style={{ fontSize: 17, color: 'white' }}>{song.title}</Text>
              )}
            {song.artist_names.length > 29 ? (
                <Text style={{ fontSize: 16, color: 'gray' }}>{song.artist_names.slice(0, 29)}...) </Text>
              ) :
              (
                <Text style={{ fontSize: 16, color: 'gray' }}>{song.artist_names} </Text>
              )
            }
          </View>

          <View style={styles.option_icon}>
            <Icon size={18} name={'options-vertical'} style={{ color: 'gray' }} />
          </View>
        </Pressable>
      </View>);
  };

  const Album = (album) => {
    return (
      <Pressable onPress={() => navigation.push('AlbumDetails', { albumId: album.id })}
                 style={{ marginRight: 20, marginBottom: 20 }}>
        <Image source={{ uri: album.cover_art_thumbnail_url }} style={{ width: 120, height: 120 }} />

        <View>
          {album.name.length > 15 ? (
            <Text style={styles.album_name}>{album.name.slice(0, 15)}...</Text>
          ) : (
            <Text style={styles.album_name}>{album.name}</Text>
          )}
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'gray' }}>{album.artist.name}</Text>
        </View>

      </Pressable>
    );
  };
  albums = albums?.filter(value => value.id !== album?.id).splice(Math.floor(Math.random() * 12) + 1, 10);

  const hashs_tags = [album?.artist.name, album?.name, album?._type];
  for (const { song } of tracks) {
    hashs_tags.push(song.title);
  }

  return (
    album ? (
      <ScrollView style={{ backgroundColor: 'black', flex: 1 }}>
        <View style={styles.header}>

          <Pressable onPress={() => Linking.openURL(album.url)}>
            <Image source={{ uri: album.cover_art_url }} style={styles.image} />
          </Pressable>

          <View style={styles.info}>
            <Text style={styles.track_name}>{album.name}</Text>
            <Text style={styles.artist_name}>{album.artist?.name}</Text>
            <Text style={styles.release}>Released {fullDate}</Text>
          </View>

        </View>

        <ScrollView horizontal
                    contentContainerStyle={styles.hash_container}>
          {hashs_tags?.map((hash, index) => <Text onPress={() => Linking.openURL(`https://genius.com/search?q=${hash} Tom MacDonald`)}
                                                  key={index} style={styles.hash_tags}># {hash}</Text>)}

        </ScrollView>

        {tracks.map(({ song }, index) => (<Track song={song} key={index} />))}

        {tracks.length !== 0 && (
          <View>
            <Text style={styles.more_albums}>More albums
              by {album.artist.name}</Text>
            <FlatList horizontal data={albums} renderItem={({ item }) => <Album name={item.name}
                                                                                cover_art_thumbnail_url={item.cover_art_thumbnail_url}
                                                                                release_date_components={item.release_date_components}
                                                                                id={item.id} artist={item.artist} />}
                      contentContainerStyle={{ justifyContent: 'space-between', marginLeft: 10 }} />
          </View>
        )}

      </ScrollView>) : <ActivityIndicator size={'large'} color={'gray'}
                                          style={{ backgroundColor: '#000', flex: 1 }} />
  );
};

const styles = StyleSheet.create({
  track_container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: 5,
  }, header: {
    flexDirection: 'row', marginTop: 20, marginBottom: 20, marginLeft: 10,
  }, image: {
    width: 130, height: 130,
  }, track_image: {
    height: 80, width: 80, marginLeft: 5, borderRadius: 2,
  }, track_name: {
    fontSize: 20, fontWeight: 'bold', color: 'white',
  }, artist_name: {
    fontSize: 20, fontWeight: 'bold', color: 'gray',
  }, release: {
    fontSize: 14, marginTop: 5, color: 'gray',
  }, text: {
    margin: 10,
  },
  hash_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    marginLeft: 5,
  },
  hash_tags: {
    color: 'lightgray',
    backgroundColor: 'gray',
    borderRadius: 20,
    fontSize: 15,
    textTransform: 'capitalize',

    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 5, marginRight: 10,
  },
  option_icon: {
    position: 'absolute', right: 20, top: 30,
  },
  album_name: {
    fontSize: 15, fontWeight: 'bold', color: 'white',
  },
  more_albums: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  info: {
    marginLeft: 15, justifyContent: 'center', width: 250,
  },
});
