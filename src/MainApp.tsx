import React, {useEffect} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import FullscreenVideoModal from './screens/FullscreenVideoModal';
import {MainStackScreen} from './screens/MainStackScreen';
import ConnectivityIndicator from './components/ConnectivityIndicator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useI18n from './hooks/useI18n';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Orientation from 'react-native-orientation-locker';
import {clearCache} from 'react-native-video-cache-control';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import useDayNightNavigationBar from './hooks/useDayNightNavigationBar';
import {useColorScheme} from 'react-native';
import tw from '../tailwind';

export const MainApp: React.FC = () => {
  useI18n();

  useDayNightNavigationBar();

  useEffect(() => {
    clearCache();
    SystemNavigationBar.setNavigationBarDividerColor('#CACACA');
    Orientation.lockToPortrait();
  }, []);

  const scheme = useColorScheme();

  const DarkNavigationHeader: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      card: tw.color('black') || DarkTheme.colors.card,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={scheme === 'dark' ? DarkNavigationHeader : DefaultTheme}>
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
  );
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
