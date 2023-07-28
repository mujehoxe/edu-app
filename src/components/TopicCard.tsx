import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {Topic} from '../types';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

interface TopicProps {
  topic: Topic;
  onPress: () => void;
}

const TopicComponent: React.FC<TopicProps> = ({topic, onPress}) => {
  return (
    <TouchableOpacity
      style={tw`p-4 border-b border-gray-300 bg-white`}
      onPress={onPress}>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-base text-slate-900 font-semibold flex-1`}>
          {topic.name}
        </Text>
        <ChevronRightIcon style={tw`w-6 h-6 text-gray-600`} />
      </View>
    </TouchableOpacity>
  );
};

export default TopicComponent;
