import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import performance, {PerformanceObserver} from 'react-native-performance';

const useHideSplashScreen = () => {
  useEffect(() => {
    new PerformanceObserver(list => {
      if (list.getEntries().find(entry => entry.name === 'runJsBundleEnd')) {
        const launchingTime =
          performance.getEntriesByName('runJsBundleEnd')[0].startTime -
          performance.getEntriesByName('nativeLaunchStart')[0].startTime;
        const splashTime = 2000; //ms
        setTimeout(() => {
          SplashScreen.hide();
        }, splashTime - launchingTime);
      }
    }).observe({type: 'react-native-mark', buffered: true});
  }, []);
};

export default useHideSplashScreen;
