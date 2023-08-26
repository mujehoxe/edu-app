import React from 'react';
import {AppProvider} from '@realm/react';
import {appId, baseUrl} from '../atlasConfig.json';
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
