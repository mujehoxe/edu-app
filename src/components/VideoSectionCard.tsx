import React, {useRef} from 'react';
import {SectionCardProps} from '../types';
import tw from 'twrnc';
import Video from 'react-native-video';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {VideoSection} from '../types';

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

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <View style={tw`rounded-lg overflow-hidden`}>
        <FastImage
          source={{uri: section.thumbnailSrc}}
          style={tw`w-full h-72`}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Video
          ref={videoRef}
          source={{uri: section.src}}
          style={tw`w-full h-72 absolute inset-0`}
          paused={!isPlaying}
          resizeMode="cover"
          muted
          repeat
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
