import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FullscreenVideoModal from './screens/FullscreenVideoModal';
import {MainStackScreen} from './screens/MainStackScreen';
import ConnectivityIndicator from './components/ConnectivityIndicator';
import {UserProvider, useApp} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useI18n from './hooks/useI18n';
import {LoadingIndicator} from './components/LoadingIndicator';
import {realmContext} from './RealmContext';
import {LogIn} from './screens/Login';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Orientation from 'react-native-orientation-locker';
import {clearCache} from 'react-native-video-cache-control';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';

const {RealmProvider} = realmContext;

export const MainApp: React.FC = () => {
  useI18n();

  const app = useApp();

  useEffect(() => {
    clearCache();
    SystemNavigationBar.setNavigationColor('#FFF');
    SystemNavigationBar.setNavigationBarDividerColor('#CACACA');
    Orientation.lockToPortrait();
  }, [app]);

  return (
    <UserProvider fallback={LogIn}>
      <RealmProvider
        sync={{
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
    </UserProvider>
  );
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
