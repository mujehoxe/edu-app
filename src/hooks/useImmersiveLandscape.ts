import {useEffect} from 'react';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const useImmersiveLandscape = () => {
  useEffect(() => {
    SystemNavigationBar.immersive();
    Orientation.lockToLandscape();

    const deviceOrientationListener = (orientaion: OrientationType) => {
      orientaion !== 'UNKNOWN' &&
        (orientaion === 'LANDSCAPE-LEFT'
          ? Orientation.lockToLandscapeLeft()
          : Orientation.lockToLandscapeRight());
    };

    Orientation.addDeviceOrientationListener(deviceOrientationListener);

    return () => {
      Orientation.lockToPortrait();
      Orientation.removeDeviceOrientationListener(deviceOrientationListener);
      SystemNavigationBar.navigationShow();
    };
  }, []);
};

export default useImmersiveLandscape;
