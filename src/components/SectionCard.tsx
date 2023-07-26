import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
import {Section} from '../types';
import tw from 'twrnc';

interface SectionCardProps {
  section: Section;
  isPlaying: boolean;
  onPress: any;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  isPlaying,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={tw`rounded-lg`}>
        <Text style={tw`text-slate-950 text-2xl font-semibold`}>
          {section.title}
        </Text>
        <Video
          source={{uri: section.src}}
          style={tw`bg-slate-950 w-full h-72`}
          paused={!isPlaying}
          muted
          repeat
        />
      </View>
    </TouchableOpacity>
  );
};

export default SectionCard;
