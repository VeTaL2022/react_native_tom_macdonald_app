import { View } from 'react-native';

export const Line = ({ color }) => {
  return (
    <View style={{
      height: 1,
      marginBottom: 15,
      alignSelf: 'stretch',

      // backgroundColor: 'rgba(255, 255, 255 ,0.4)',
      backgroundColor: color,
    }} />
  );
};
