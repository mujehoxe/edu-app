import React, {useEffect, useState} from 'react';
import useHideSplashScreen from './hooks/useHideSplashScreen';
import {MainApp} from './MainApp';
import tw from '../tailwind';
import {useDeviceContext} from 'twrnc';
import {Login} from './screens/Login';
import auth from '@react-native-firebase/auth';

const App: React.FC = () => {
  useHideSplashScreen();

  useDeviceContext(tw);

  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState();

  useEffect(() => {
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return <Login />;
  }

  return <MainApp />;
};

export default App;
