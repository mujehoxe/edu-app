import React, {useEffect} from 'react';
import Realm from 'realm';
import {NavigationContainer} from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import FullscreenVideoModal from './screens/FullscreenVideoModal';
import Orientation from 'react-native-orientation-locker';
import {clearCache} from 'react-native-video-cache-control';
import {MainStackScreen} from './screens/MainStackScreen';
import ConnectivityIndicator from './components/ConnectivityIndicator';
import {useApp} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useI18n from './hooks/useI18n';
import {LoadingIndicator, RootStack} from './App';

import {realmContext} from './RealmContext';
const {RealmProvider} = realmContext;

export const MainApp: React.FC = () => {
  useI18n();
  useEffect(() => {
    clearCache();
    SystemNavigationBar.setNavigationColor('#FFF', 'dark');
    SystemNavigationBar.setNavigationBarDividerColor('#CACACA');
    Orientation.lockToPortrait();
  }, []);

  const app = useApp();

  useEffect(() => {
    const login = async () => {
      const credentials = Realm.Credentials.anonymous();
      await app.logIn(credentials);
    };
    login();
  }, [app]);

  return (
    <RealmProvider
      sync={{
        user: app.currentUser,
        flexible: true,
        onError: (_, error) => {
          console.error(error);
        },
      }}
      fallback={LoadingIndicator}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName="Units"
            screenOptions={{presentation: 'modal'}}>
            <RootStack.Screen
              name="Main"
              component={MainStackScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="FullscreenVideoModal"
              component={FullscreenVideoModal}
              options={{title: '', headerTransparent: true}}
            />
          </RootStack.Navigator>
          <ConnectivityIndicator />
        </NavigationContainer>
      </SafeAreaProvider>
    </RealmProvider>
  );
};
