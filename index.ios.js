import { AppRegistry } from 'react-native';
import RequiresConnection from 'react-native-offline-mode';
import LeafMgrApp from './src/app';
import OfflineView from './src/views/offline';

AppRegistry.registerComponent('LeafProjectApp', () => RequiresConnection(LeafMgrApp, OfflineView));
