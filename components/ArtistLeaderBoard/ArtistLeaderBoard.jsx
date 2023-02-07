import { Dimensions, FlatList, Image, Linking, LogBox, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { artistService } from '../../services';
import { Line } from '../Line';

export const ArtistLeaderBoard = ({ id }) => {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    artistService.getLeaderboard(id).then(({ data }) => setLeaderBoard(data.leaderboard));
  }, []);

  // const LeaderBoard = (leaderBoard) => {
  //   return (
  //     <>
  //       <View style={styles.leaderBoard_container}>
  //         <Pressable style={styles.user_info}
  //                    onPress={() => Linking.openURL(leaderBoard.user.url)}>
  //           <Image source={{ uri: leaderBoard.user.header_image_url }}
  //                  style={styles.user_image} />
  //
  //           {leaderBoard.user.name.length > 20 ? (
  //               <Text style={styles.user_name}>{leaderBoard.user.name.slice(0, 20)}...</Text>
  //             ) :
  //             <Text style={styles.user_name}>{leaderBoard.user.name}</Text>
  //           }
  //
  //           <Text style={styles.user_iq}>{leaderBoard.user.iq.toLocaleString()}</Text>
  //         </Pressable>
  //
  //         <Text
  //           style={styles.user_attribution_value}>
  //           {Math.floor(leaderBoard.attribution_value).toLocaleString()}
  //         </Text>
  //
  //       </View>
  //       <Line color={'#99A7EE'} />
  //     </>
  //   );
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.main_text}>TOP TOM MACDONALD SCHOLARS</Text>

      {/*<FlatList data={leaderBoard}*/}
      {/*          renderItem={({ item }) => <LeaderBoard attribution_value={item.attribution_value}*/}
      {/*                                                 user={item.user} />}*/}
      {/*          style={{ backgroundColor: 'white' }} />*/}

      <View style={{backgroundColor: 'white'}}>
      {leaderBoard?.map((leader, index) =>
        <View key={index}>
          <View style={styles.leaderBoard_container}>
            <Pressable style={styles.user_info}
                       onPress={() => Linking.openURL(leader.user.url)}>
              <Image source={{ uri: leader.user.header_image_url }}
                     style={styles.user_image} />

              {leader.user.name.length > 20 ? (
                  <Text style={styles.user_name}>{leader.user.name.slice(0, 20)}...</Text>
                ) :
                <Text style={styles.user_name}>{leader.user.name}</Text>
              }

              <Text style={styles.user_iq}>{leader.user.iq.toLocaleString()}</Text>
            </Pressable>

            <Text
              style={styles.user_attribution_value}>
              {Math.floor(leader.attribution_value).toLocaleString()}
            </Text>

          </View>
          <Line color={'#99A7EE'} />
        </View>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_text: {
    fontSize: 18, textAlign: 'center',
    padding: 10,
  },
  container: {
    backgroundColor: 'lightgray',
    marginBottom: 15, marginTop: 10,
    width: Dimensions.get('window').width - 40,
    borderRadius: 5,
  },
  leaderBoard_container: {
    flexDirection: 'row', margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user_info: {
    flexDirection: 'row', alignItems: 'center',
    marginLeft: 5,
  },
  user_image: {
    height: 30, width: 30, borderRadius: 15,
  },
  user_name: {
    fontSize: 17, fontWeight: 'bold',
    paddingLeft: 10, color: '#222222',
  },
  user_iq: {
    paddingLeft: 5, paddingTop: 5,
    color: 'gray',
  },
  user_attribution_value: {
    color: '#99A7EE', fontWeight: '500',
    paddingRight: 5,
  },
});
