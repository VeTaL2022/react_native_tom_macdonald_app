import { Dimensions, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

export const ArtistSocialMedia = ({ artist }) => {
  const openURL = (site, name) => Linking.openURL(`https://www.${site}.com/${name}`);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => openURL('facebook', artist.facebook_name)}
                 style={styles.facebook_background}>
        <Icon size={20} name={'facebook'} color={'white'} />
        <Text style={styles.facebook_name}>{artist.facebook_name}</Text>
      </Pressable>

      <Pressable onPress={() => openURL('twitter', artist.twitter_name)}
                 style={styles.twitter_background}>
        <Icon size={20} name={'twitter'} color={'white'} />
        <Text style={styles.twitter_name}>@{artist.twitter_name}</Text>

      </Pressable>

      <Pressable onPress={() => openURL('instagram', artist.instagram_name)}
                 style={styles.instagram_background}>
        <Icon size={20} name={'instagram'} color={'white'} />
        <Text style={styles.instagram_name}>@{artist.instagram_name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    paddingTop: 5,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  facebook_background: {
    width: 195,
    backgroundColor: '#3B5998',
    borderRadius: 3,

    flexDirection: 'row',
    padding: 8,
    marginBottom: 5,
  },
  facebook_name: {
    color: 'white', fontWeight: 'bold',
    fontSize: 16, paddingLeft: 3,
  },
  twitter_background: {
    width: 220,
    backgroundColor: '#55ACEE',
    borderRadius: 3,

    flexDirection: 'row',
    padding: 8,
    marginBottom: 5,
  },
  twitter_name: {
    color: 'white', fontWeight: 'bold',
    fontSize: 16, paddingLeft: 3,
  },
  instagram_background: {
    width: 160,
    backgroundColor: '#000',
    borderRadius: 3,

    flexDirection: 'row',
    padding: 8,
    marginBottom: 5,
  },
  instagram_name: {
    color: 'white', fontWeight: 'bold',
    fontSize: 16, paddingLeft: 3,
  },
});
