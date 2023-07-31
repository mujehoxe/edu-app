import React from 'react';
import {View, Text, TouchableOpacity, I18nManager} from 'react-native';
import tw from 'twrnc';
import {Topic} from '../types';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';

interface TopicProps {
  topic: Topic;
  onPress: () => void;
}

const TopicComponent: React.FC<TopicProps> = ({topic, onPress}) => {
  const isRTL = I18nManager.isRTL;

  return (
    <TouchableOpacity
      style={tw`p-4 border-b border-gray-300 bg-white`}
      onPress={onPress}>
      <View style={tw`flex-row items-center`}>
        <Text
          style={tw`text-base text-slate-900 font-semibold flex-1 ${
            isRTL ? 'text-left' : 'text-right'
          }`}>
          {topic.name}
        </Text>
        {isRTL ? (
          <ChevronLeftIcon style={tw`w-6 h-6 text-slate-600`} />
        ) : (
          <ChevronRightIcon style={tw`w-6 h-6 text-slate-600`} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TopicComponent;
