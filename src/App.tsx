import React, {useEffect} from 'react';
import Realm from 'realm';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from '../locales/en.json';
import arTranslation from '../locales/ar.json';
import {ActivityIndicator, I18nManager, StatusBar, View} from 'react-native';
import RNRestart from 'react-native-restart';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import FullscreenVideoModal from './screens/FullscreenVideoModal';
import Orientation from 'react-native-orientation-locker';
import {clearCache} from 'react-native-video-cache-control';
import {MainStackScreen} from './screens/MainStackScreen';
import ConnectivityIndicator from './components/ConnectivityIndicator';
import {AppProvider, UserProvider, useApp} from '@realm/react';
import {realmContext} from './RealmContext';
import {appId, baseUrl} from '../atlasConfig.json';
import tw from 'twrnc';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Unit} from './Schemas';

const App: React.FC = () => {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </AppProvider>
  );
};

export default App;

const LoadingIndicator = () => {
  return (
    <View style={tw`flex-1 flex-row justify-around p-3`}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
const {RealmProvider} = realmContext;

const MainApp: React.FC = () => {
  const app = useApp();

  useEffect(() => {
    clearCache();
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    !I18nManager.isRTL && RNRestart.restart();
    SystemNavigationBar.setNavigationColor('#FFF', 'light');
    SystemNavigationBar.setNavigationBarDividerColor('#CACACA');
    Orientation.lockToPortrait();
  }, [app]);

  useEffect(() => {
    const login = async () => {
      const credentials = Realm.Credentials.anonymous();
      const user = await app.logIn(credentials);
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
      </SafeAreaProvider>
    </RealmProvider>
  );
};

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
