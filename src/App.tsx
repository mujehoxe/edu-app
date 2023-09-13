import React, {useEffect, useState} from 'react';
import useHideSplashScreen from './hooks/useHideSplashScreen';
import {MainApp} from './MainApp';
import tw from '../tailwind';
import {useDeviceContext} from 'twrnc';
import {Login} from './screens/Login';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {LoadingIndicator} from './components/LoadingIndicator';

const App: React.FC = () => {
  useHideSplashScreen();

  useDeviceContext(tw);

  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    function onAuthStateChanged(newUser: FirebaseAuthTypes.User | null) {
      setUser(newUser);
      if (initializing) {
        setInitializing(false);
      }
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Unsubscribe on unmount
  }, [initializing]);

  if (initializing) {
    return <LoadingIndicator />;
  }

  if (!user) {
    return <Login />;
  }

  return <MainApp />;
};

export default App;
