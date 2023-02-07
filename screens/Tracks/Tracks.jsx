import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Fontisto';
import { useEffect, useState } from 'react';

import { artistService, searchService } from '../../services';
import { Line } from '../../components/Line';

const id = 1191624;

export const Tracks = () => {
  const navigation = useNavigation();
  const [tracks, setTracks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState(' ');
  const [track, setTrack] = useState({});
  const [typing, setTyping] = useState('');

  useEffect(() => {
    artistService.getSongs(id, currentPage).then(({ data }) => setTracks([...tracks, ...data.songs]));
    searchService.getByName(name).then(({ data }) => setTrack(data));
  }, [currentPage, name]);

  const fetchMoreData = () => setCurrentPage(currentPage + 1);

  const Track = (song) => {
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <Pressable style={styles.child_container}
                   onPress={() => navigation.navigate('TrackDetails', { trackId: song.id })}>
          <Image source={{ uri: song.song_art_image_thumbnail_url }} style={styles.image} />

          <View style={styles.text}>

            {song.title.length > 23 ? (
                <Text style={{ fontSize: 17, color: 'white' }}>{song.title.slice(0, 23)}...</Text>
              ) :
              (
                <Text style={{ fontSize: 17, color: 'white' }}>{song.title}</Text>
              )}

            {song.artist_names.length > 23 ? (
                <Text style={{ fontSize: 16, color: 'gray' }}>{song.artist_names.slice(0, 23)}... </Text>
              ) :
              (
                <Text style={{ fontSize: 16, color: 'gray' }}>{song.artist_names} </Text>
              )
            }

            <View style={styles.views}>
              <Icon size={10} name={'eye'} color={'darkgray'} />
              {song.stats?.pageviews > 0 ? (
                  <Text
                    style={{ color: 'darkgray', paddingLeft: 5 }}>{(song.stats?.pageviews / 1000).toFixed(1) + 'K'}</Text>
                ) :
                <Text style={{
                  color: 'darkgray',
                  paddingLeft: 5,
                }}>0K</Text>}
            </View>

          </View>

          <View style={styles.option_icon}>
            <Icon2 size={18} name={'options-vertical'} style={{ color: 'gray' }} />
          </View>

        </Pressable>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <Line color={'rgba(255, 255, 255 ,0.4)'} />
        <ActivityIndicator size={'large'} color={'#aaa'} />
      </View>);
  };

  const filteredById = track?.hits?.filter(value => value.result.primary_artist.id === id);

  return (
    <>
      {tracks.length !== 0 ? (
        <View style={styles.container}>

          <View style={styles.search_bar}>
            <Icon size={20} name={'search'} color={'white'} style={styles.search_close_icon} />

            <TextInput style={styles.input} defaultValue={name} value={typing}
                       onSubmitEditing={(value) => setName(value.nativeEvent.text)}
                       onChangeText={(value) => setTyping(value)}
                       placeholder={'Search'} placeholderTextColor={'white'} />

            <Icon size={20} name={'close'} color={'white'} style={styles.search_close_icon} onPress={() => {
              setName(' ');
              setTyping('');
            }} />
          </View>

          {filteredById?.length !== 0 ? (
            <FlatList data={filteredById} renderItem={({ item }) => <Track
              song_art_image_thumbnail_url={item.result.song_art_image_thumbnail_url} title={item.result.title}
              id={item.result.id} stats={item.result.stats}
              artist_names={item.result.artist_names}
            />}
            />) : (<FlatList data={tracks}
                             renderItem={({ item }) => <Track
                               song_art_image_thumbnail_url={item.song_art_image_thumbnail_url}
                               title={item.title} id={item.id} stats={item.stats} artist_names={item.artist_names}
                             />}
                             keyExtractor={(song, index) => index}
                             ListFooterComponent={renderLoader}
                             onEndReached={fetchMoreData}
                             onEndReachedThreshold={0}
          />)}

        </View>
      ) : <ActivityIndicator size={'large'} color={'gray'} style={{ backgroundColor: '#000', flex: 1 }} />}
    </>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }, child_container: {
    flexDirection: 'row',
    position: 'relative',
    marginTop: 15,
  }, image: {
    height: 80, width: 80, marginLeft: 5, borderRadius: 2,
  },
  text: { marginLeft: 10, marginTop: 3, marginBottom: 5 },
  loader: {
    marginVertical: 16, alignItems: 'center',
  }, search_bar: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5, marginRight: 5, marginTop: 5,
  }, search_close_icon: {
    marginTop: 15, marginHorizontal: 10,
  }, input: {
    flex: 1, fontSize: 18, paddingVertical: 10, color: 'white',
  },
  views: {
    flexDirection: 'row', alignItems: 'center', paddingTop: 10,
  },
  option_icon: {
    position: 'absolute', right: 15, top: 30,
  },
});
