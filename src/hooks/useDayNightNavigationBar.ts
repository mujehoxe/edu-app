import {useEffect} from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {StatusBar, useColorScheme} from 'react-native';

export const useDayNightNavigationBar = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (colorScheme === 'light') {
      SystemNavigationBar.setNavigationColor('white');
      StatusBar.setBackgroundColor('white');
      StatusBar.setBarStyle('dark-content');
    } else {
      SystemNavigationBar.setNavigationColor('black');
      StatusBar.setBackgroundColor('black');
      StatusBar.setBarStyle('light-content');
    }
  }, [colorScheme]);
};

export default useDayNightNavigationBar;
