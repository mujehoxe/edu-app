import React from 'react';
import tw from '../../tailwind';
import {View} from 'react-native';
import {RootStackParamList} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useImmersiveLandscape from '../hooks/useImmersiveLandscape';
import VideoPlayer from '../components/VideoPlayer';

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
  useImmersiveLandscape();

  return (
    <View style={tw`bg-black w-full h-full`}>
      <VideoPlayer {...route.params} isFullscreen={true} />
    </View>
  );
};

export default FullscreenVideoModal;
