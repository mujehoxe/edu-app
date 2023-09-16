import React, {useRef, useState} from 'react';
import Video, {OnProgressData} from 'react-native-video';
import tw from '../../tailwind';
import {LoadingIndicator} from './LoadingIndicator';
import {View} from 'react-native';
import {VideoSection} from './VideoSectionCard';

export interface VideoPlayerProps {
  section: VideoSection;
  isPlaying: boolean;
  onPlayPause: () => void;
  currentPlaybackTime: number;
  setCurrentPlaybackTime: (time: number) => void;
  isFullscreen?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  section,
  isPlaying,
  onPlayPause,
  currentPlaybackTime,
  setCurrentPlaybackTime,
  isFullscreen,
}) => {
  const videoRef = useRef<Video>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onProgress = (data: OnProgressData) => {
    setCurrentPlaybackTime(data.currentTime);
    setIsLoading(false);
  };

  return (
    <View
      style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
      {isLoading && <LoadingIndicator />}
      <Video
        style={tw`absolute top-0 left-0 right-0 bottom-0`}
        ref={videoRef}
        source={{uri: section.src}}
        paused={!isPlaying}
        resizeMode="cover"
        poster={section.thumbnailSrc}
        posterResizeMode="cover"
        controls={isFullscreen}
        bufferConfig={{
          maxBufferMs: 30000,
          bufferForPlaybackMs: 500,
        }}
        onBuffer={({isBuffering}) => setIsLoading(isBuffering)}
        onLoad={() => {
          videoRef.current?.seek(currentPlaybackTime);
        }}
        onProgress={onProgress}
        onEnd={() => {
          setCurrentPlaybackTime(0);
          onPlayPause(); // to pause the video
        }}
      />
    </View>
  );
};

export default VideoPlayer;
