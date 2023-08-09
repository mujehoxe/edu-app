import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/types';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';
import {I18nManager, StatusBar} from 'react-native';
import RNRestart from 'react-native-restart';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import FullscreenVideoModal from './src/screens/FullscreenVideoModal';
import Orientation from 'react-native-orientation-locker';
import {clearCache} from 'react-native-video-cache-control';
import {MainStackScreen} from './src/screens/MainStackScreen';
import ConnectivityIndicator from './src/components/ConnectivityIndicator';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  useEffect(() => {
    clearCache();
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    !I18nManager.isRTL && RNRestart.restart();
    SystemNavigationBar.setNavigationColor('#FFF', 'light');
    SystemNavigationBar.setNavigationBarDividerColor('#CACACA');
    Orientation.lockToPortrait();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
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
  );
};

export default App;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: enTranslation},
    ar: {translation: arTranslation},
  },
  lng: 'ar-DZ',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
