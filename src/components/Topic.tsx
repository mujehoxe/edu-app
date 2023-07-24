import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {Topic} from '../types';

interface TopicProps {
  topic: Topic;
  onPress: () => void;
}

const Topic: React.FC<TopicProps> = ({topic, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={tw`flex-row items-center p-4 border-b border-gray-300`}>
        <Text style={tw`text-base text-slate-900`}>{topic.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Topic;
