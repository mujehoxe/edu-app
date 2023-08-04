import React, {useRef, useState} from 'react';
import {SectionCardProps} from '../types';
import tw from 'twrnc';
import Video, {OnProgressData} from 'react-native-video';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {VideoSection} from '../types';
import {useNavigation} from '@react-navigation/native';
import {FullscreenVideoModalNavigationProp} from '../screens/FullscreenVideoModal';
import convertToProxyURL from 'react-native-video-cache-control';
import {PlayIcon} from 'react-native-heroicons/outline';
import {ArrowsPointingOutIcon} from 'react-native-heroicons/solid';

interface VideoSectionCardProps extends SectionCardProps {
  section: VideoSection;
  isPlaying: boolean;
  onPress: () => void;
}

const VideoSectionCard: React.FC<VideoSectionCardProps> = ({
  section,
  isPlaying,
  onPress,
}) => {
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation<FullscreenVideoModalNavigationProp>();
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);

  const onProgress = (data: OnProgressData) =>
    setCurrentPlaybackTime(data.currentTime);

  const switchToFullscreen = () => {
    navigation.navigate('FullscreenVideoModal', {
      src: section.src,
      paused: videoRef.current?.props.paused,
      currentPlaybackTime,
      onProgress,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onLongPress={switchToFullscreen}>
      <View style={tw`rounded-lg overflow-hidden`}>
        <FastImage
          source={{uri: section.thumbnailSrc}}
          style={tw`w-full h-72`}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Video
          ref={videoRef}
          source={{uri: convertToProxyURL({url: section.src})}}
          style={tw`w-full h-72 absolute inset-0`}
          paused={!isPlaying}
          resizeMode="cover"
          onProgress={onProgress}
          onEnd={() => setCurrentPlaybackTime(0)}
          muted={false}
        />

        {!isPlaying && (
          <View
            style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
            <PlayIcon
              width={80}
              height={50}
              style={tw`text-white rounded-md bg-slate-600 opacity-80`}
            />
          </View>
        )}

        <View style={tw`absolute bottom-2 left-2`}>
          <ArrowsPointingOutIcon
            width={28}
            height={28}
            stroke={'black'}
            strokeWidth={1}
            strokeOpacity={80}
            style={tw`text-white`}
            onPress={switchToFullscreen}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VideoSectionCard;
