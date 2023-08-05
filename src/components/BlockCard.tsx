import React from 'react';
import {FlatList, Text, View} from 'react-native';
import tw from 'twrnc';
import TopicCard from './TopicCard';
import {Block, Topic} from '../types';

export interface BlockCardProps {
  block: Block;
}

const BlockCard: React.FC<BlockCardProps> = ({block}) => {
  const renderTopic = ({item}: {item: Topic}) => (
    <View style={tw`px-4 py-3`}>
      <TopicCard topic={item} />
    </View>
  );

  return (
    <View style={tw`bg-white shadow-md rounded-md`}>
      <View style={tw`bg-gray-100 p-4 border-b border-gray-300 rounded-t-md`}>
        <Text style={tw`text-lg font-semibold text-slate-900`}>
          {block.name}
        </Text>
      </View>
      <FlatList
        data={block.topics}
        renderItem={renderTopic}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={tw`pb-8`}
      />
    </View>
  );
};

export default BlockCard;
