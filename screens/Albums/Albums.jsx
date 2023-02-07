import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { artistService } from '../../services';

export const Albums = () => {
  const [albums, setAlbums] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    artistService.getAlbums(1191624).then(({ data }) => setAlbums(data.albums));
  }, []);

  const Album = (album) => {
    return (
      <View>
        <Pressable onPress={() => navigation.navigate('AlbumDetails', { albumId: album.id })} style={styles.child_container}>
          <Image source={{ uri: album.cover_art_thumbnail_url }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.album_name}>{album.name}</Text>
            <Text style={styles.artist_name}>{album.artist.name}</Text>
            <Text style={{ color: 'gray' }}>{album.release_date_components.year}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    albums.length ? (
        <FlatList data={albums} renderItem={({ item }) => <Album name={item.name}
                                                                cover_art_thumbnail_url={item.cover_art_thumbnail_url}
                                                                release_date_components={item.release_date_components}
                                                                id={item.id} artist={item.artist} />}
                  style={{ backgroundColor: '#000' }} />
      ) :
      <ActivityIndicator size={'large'} color={'gray'} style={{ backgroundColor: '#000', flex: 1 }} />
  );
};

const styles = StyleSheet.create({
  child_container: {
    margin: 10,
    flexDirection: 'row',
  },
  image: {
    height: 105,
    width: 105,
  },
  info: {
    margin: 12,
  },
  album_name: {
    fontSize: 17, fontWeight: 'bold', color: 'white', width: 200
  },
  artist_name: {
    fontSize: 16, fontWeight: 'bold', color: 'gray'
  }
});
