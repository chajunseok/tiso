/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {RecoilRoot} from 'recoil';
import {name as appName} from './app.json';

const RootComponent = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

AppRegistry.registerComponent(appName, () => RootComponent);
