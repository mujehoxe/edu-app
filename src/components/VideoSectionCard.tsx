import React, {useState} from 'react';
import {SectionCardProps} from '../types';
import tw from '../../tailwind';
import {Section} from '../types';
import {useNavigation} from '@react-navigation/native';
import {FullscreenVideoModalNavigationProp} from '../screens/FullscreenVideoModal';
import {
  PauseIcon,
  PlayIcon,
  ArrowsPointingOutIcon,
} from 'react-native-heroicons/solid';
import VideoPlayer from './VideoPlayer';
import {TouchableOpacity, View} from 'react-native';

interface VideoSectionCardProps extends SectionCardProps {
  section: VideoSection;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const VideoSectionCard: React.FC<VideoSectionCardProps> = ({
  section,
  isPlaying,
  onPlayPause,
}) => {
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const navigation = useNavigation<FullscreenVideoModalNavigationProp>();

  const videoPlayerProps = {
    section,
    isPlaying,
    onPlayPause,
    currentPlaybackTime,
    setCurrentPlaybackTime,
  };

  const switchToFullscreen = () => {
    navigation.navigate('FullscreenVideoModal', {...videoPlayerProps});
  };

  const handlePress = () => {
    if (!isPlaying || showOverlay) {
      setShowOverlay(false);
      onPlayPause(); // to pause the video
    } else {
      setTimeout(() => setShowOverlay(false), 3000);
      setShowOverlay(true);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      onLongPress={switchToFullscreen}>
      <View style={tw`w-full h-72`}>
        <VideoPlayer {...videoPlayerProps} />
      </View>

      {!isPlaying && (
        <View
          style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
          <PlayIcon
            width={80}
            height={50}
            style={tw`text-white rounded-md bg-slate-600 bg-opacity-80`}
          />
        </View>
      )}

      {showOverlay && (
        <>
          <View
            style={tw`absolute top-0 left-0 right-0 bottom-0 bg-opacity-30 bg-black flex items-center justify-center`}>
            <PauseIcon
              width={80}
              height={50}
              stroke={'black'}
              style={tw`text-white`}
            />
          </View>
          <View style={tw`absolute rounded-md bottom-2 left-2`}>
            <ArrowsPointingOutIcon
              width={35}
              height={35}
              stroke={'black'}
              strokeWidth={1}
              strokeOpacity={80}
              style={tw`text-white`}
              onPress={switchToFullscreen}
            />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default VideoSectionCard;

export interface VideoSection extends Section {
  contentType: 'video';
  thumbnailSrc: string;
}
