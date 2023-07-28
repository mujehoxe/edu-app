import React, {useRef, useState} from 'react';
import {SectionCardProps} from '../types';
import tw from 'twrnc';
import {Text, View} from 'react-native';
//import FastImage from 'react-native-fast-image';
import {VideoSection} from '../types';
import {
  GestureHandlerRootView,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';

interface VideoSectionCardProps extends SectionCardProps {
  section: VideoSection;
  isPlaying: boolean;
  onPress: () => void;
}

export const VideoSectionCard: React.FC<VideoSectionCardProps> = ({
  section,
  isPlaying,
  onPress,
}) => {
  const videoPlayer = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const noop = () => {};

  const onSeek = seek => {
    videoPlayer?.current.seek(seek);
  };

  const onPaused = playerState => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer?.current.seek(0);
  };

  const onProgress = data => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    // Uncomment this line if you choose repeat=false in the video player
    // setPlayerState(PLAYER_STATES.ENDED);
  };

  const onSeeking = currentTime => setCurrentTime(currentTime);

  return (
    <GestureHandlerRootView style={tw`rounded-lg overflow-hidden`}>
      <TapGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          nativeEvent.state === State.ACTIVE && onPress();
        }}>
        <View style={tw`rounded-lg overflow-hidden`}>
          {/* <FastImage
            source={{uri: section.thumbnailSrc}}
            style={tw`w-full h-72`}
            resizeMode={FastImage.resizeMode.cover}
          /> */}

          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            ref={ref => (videoPlayer.current = ref)}
            source={{uri: section.src}}
            style={tw`w-full h-72 absolute inset-0`}
            paused={!isPlaying}
            resizeMode="cover"
            muted
            repeat
          />

          <MediaControls
            isFullScreen={isFullScreen}
            duration={duration}
            isLoading={isLoading}
            mainColor="orange"
            onFullScreen={noop}
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            playerState={playerState}
            progress={currentTime}>
            <MediaControls.Toolbar>
              <View style={tw`mt-8 bg-white p-3 rounded-md`}>
                <Text>I'm a custom toolbar </Text>
              </View>
            </MediaControls.Toolbar>
          </MediaControls>

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
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};
