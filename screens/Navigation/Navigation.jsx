import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { Home } from '../Home';
import { Transition } from '../Transition';
import { Artist } from '../Artist';
import { Tracks } from '../Tracks';
import { TrackDetails } from '../TrackDetails';
import { Albums } from '../Albums';
import { AlbumDetails } from '../AlbumDetails';

const Stack = createNativeStackNavigator();
export const Navigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Program'}
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'darkgray',
        }}>
        {/*screenOptions={{headerShown: false}}>*/}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: null, headerShown: false }}
        />
        <Stack.Screen name="Transition" component={Transition} />
        <Stack.Screen name="Artist" component={Artist} />
        <Stack.Screen name="Tracks" component={Tracks} />
        <Stack.Screen
          name="TrackDetails"
          component={TrackDetails}
          options={{
            title: null,
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'darkgray',
          }}
        />
        <Stack.Screen name="Albums" component={Albums} />
        <Stack.Screen
          name="AlbumDetails"
          component={AlbumDetails}
          options={{
            title: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
