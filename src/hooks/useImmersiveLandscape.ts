import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const useImmersiveLandscape = () => {
  useEffect(() => {
    StatusBar.setHidden(true);
    SystemNavigationBar.navigationHide();
    Orientation.lockToLandscape();

    const deviceOrientationListener = (orientaion: OrientationType) => {
      orientaion !== 'UNKNOWN' &&
        (orientaion === 'LANDSCAPE-LEFT'
          ? Orientation.lockToLandscapeLeft()
          : Orientation.lockToLandscapeRight());
    };

    Orientation.addDeviceOrientationListener(deviceOrientationListener);

    return () => {
      StatusBar.setHidden(false);
      SystemNavigationBar.navigationShow();
      Orientation.lockToPortrait();
      Orientation.removeDeviceOrientationListener(deviceOrientationListener);
    };
  }, []);
};

export default useImmersiveLandscape;
