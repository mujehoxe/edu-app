import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from '../../tailwind';
import {Topic} from '../types';
import {TopicDetailsScreenNavigationProp} from '../screens/TopicDetails';
import {useNavigation} from '@react-navigation/native';

interface TopicProps {
  topic: Topic;
}

const TopicComponent: React.FC<TopicProps> = ({topic}) => {
  const navigation = useNavigation<TopicDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={tw`px-4 py-2  bg-white`}
      onPress={() => navigation.navigate('TopicDetails', {topic})}>
      <View style={tw`flex-row items-center`}>
        <Text
          style={tw`text-sm text-slate-600 border-b border-slate-200 font-semibold flex-1`}>
          {topic.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopicComponent;
