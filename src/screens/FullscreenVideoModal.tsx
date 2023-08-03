import React, {useEffect, useRef} from 'react';
import tw from 'twrnc';
import Video from 'react-native-video';
import {View} from 'react-native';
import {RootStackParamList} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import convertToProxyURL from 'react-native-video-cache-control';

export type FullscreenVideoModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FullscreenVideoModal'
>;

type FullscreenVideoModalRouteProp = RouteProp<
  RootStackParamList,
  'FullscreenVideoModal'
>;

interface FullscreenVideoModalProps
  extends NativeStackScreenProps<RootStackParamList, 'FullscreenVideoModal'> {
  route: FullscreenVideoModalRouteProp;
}

const FullscreenVideoModal: React.FC<FullscreenVideoModalProps> = ({route}) => {
  const {src, paused, currentPlaybackTime, onProgress} = route.params;
  const modalVideoRef = useRef<Video>(null);

  useEffect(() => {
    SystemNavigationBar.immersive();
    Orientation.lockToLandscape();
    Orientation.addDeviceOrientationListener(orientaion => {
      orientaion !== 'UNKNOWN' &&
        (orientaion === 'LANDSCAPE-LEFT'
          ? Orientation.lockToLandscapeLeft()
          : Orientation.lockToLandscapeRight());
    });

    return () => {
      Orientation.lockToPortrait();
      Orientation.removeAllListeners();
      SystemNavigationBar.navigationShow();
    };
  }, [currentPlaybackTime]);

  return (
    <View style={tw`bg-black w-full h-full`}>
      <Video
        ref={modalVideoRef}
        source={{uri: convertToProxyURL({url: src})}}
        style={tw`bg-black h-full absolute inset-0`}
        paused={paused}
        onLoad={() => modalVideoRef.current?.seek(currentPlaybackTime)}
        onProgress={data => onProgress(data)}
        onEnd={() => 0}
        resizeMode="cover"
      />
    </View>
  );
};

export default FullscreenVideoModal;
