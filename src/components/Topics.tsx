import React from 'react';
import {View, Text, FlatList} from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface Topic {
  id: number;
  name: string;
}

interface TopicsProps {
  route: {params: {topics: Topic[]}};
}

const Topics: React.FC<TopicsProps> = ({route}) => {
  const {topics} = route.params;

  const renderItem = ({item}: {item: Topic}) => {
    return (
      <View style={tw`flex-row items-center p-4 border-b border-gray-300`}>
        <Text style={tw`text-base`}>{item.name}</Text>
      </View>
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
