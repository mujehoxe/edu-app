import React from 'react';
import {AppProvider} from '@realm/react';
import {appId, baseUrl} from '../atlasConfig.json';
import useHideSplashScreen from './hooks/useHideSplashScreen';
import {MainApp} from './MainApp';
import tw from '../tailwind';
import {useDeviceContext} from 'twrnc';

const App: React.FC = () => {
  useHideSplashScreen();

  useDeviceContext(tw);

  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <MainApp />
    </AppProvider>
  );
};

export default App;
