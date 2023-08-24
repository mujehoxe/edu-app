import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {ActivityIndicator, View} from 'react-native';
import {AppProvider} from '@realm/react';
import {appId, baseUrl} from '../atlasConfig.json';
import tw from 'twrnc';
import useHideSplashScreen from './hooks/useHideSplashScreen';
import {MainApp} from './MainApp';

const App: React.FC = () => {
  useHideSplashScreen();
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <MainApp />
    </AppProvider>
  );
};

export default App;

export const LoadingIndicator = () => {
  return (
    <View style={tw`flex-1 flex-row bg-white justify-around p-3`}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();
