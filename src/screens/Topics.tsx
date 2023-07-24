import React from 'react';
import {View, FlatList} from 'react-native';
import tw from 'twrnc';
import TopicComponent from '../components/Topic';
import {Topic} from '../types';

interface TopicsProps {
  route: {
    params: {
      topics: Topic[];
    };
  };
}

const Topics: React.FC<TopicsProps> = ({route}) => {
  const {topics} = route.params;

  const renderItem = ({item}: {item: Topic}) => {
    return (
      <TopicComponent
        topic={item}
        onPress={() => {
          /* Handle onPress */
        }}
      />
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Topics;
