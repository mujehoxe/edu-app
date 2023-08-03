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

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onLongPress={() => {
        navigation.navigate('FullscreenVideoModal', {
          src: section.src,
          paused: videoRef.current?.props.paused,
          currentPlaybackTime,
          onProgress,
        });
      }}>
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
          onLoad={() => {
            videoRef.current?.seek(currentPlaybackTime);
          }}
          resizeMode="cover"
          onProgress={onProgress}
          onEnd={() => setCurrentPlaybackTime(0)}
          muted={false}
        />

        {isPlaying ? (
          <View style={tw`absolute top-2 right-2`}>
            <View style={tw`w-2 h-2 bg-teal-400 rounded-full`} />
          </View>
        ) : (
          <View style={tw`absolute top-2 right-2`}>
            <View style={tw`w-2 h-2 bg-red-700`} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default VideoSectionCard;
