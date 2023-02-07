import SystemNavigationBar from 'react-native-system-navigation-bar';

import {Navigation} from './screens/Navigation';

export default function App() {
  SystemNavigationBar.setNavigationColor('#000').then();

  return <Navigation />;
}
