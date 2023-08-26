import {useEffect} from 'react';
import {useAppColorScheme} from 'twrnc';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {StatusBar} from 'react-native';
import tw from '../../tailwind';

const useDayNightNavigationBar = () => {
  const [colorScheme] = useAppColorScheme(tw);

  useEffect(() => {
    if (colorScheme === 'light') {
      SystemNavigationBar.setNavigationColor('white');
      StatusBar.setBarStyle('dark-content');
    } else {
      SystemNavigationBar.setNavigationColor('black');
      StatusBar.setBarStyle('light-content');
    }
  }, [colorScheme]);
};

export default useDayNightNavigationBar;
