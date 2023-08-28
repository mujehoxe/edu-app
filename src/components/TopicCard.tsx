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
      style={tw`px-4 py-2`}
      onPress={() => navigation.navigate('TopicDetails', {topic})}>
      <View style={tw`flex-row items-center`}>
        <Text
          style={tw`flex-1 text-sm font-semibold border-b
            text-gray-600 dark:text-slate-300
            border-gray-200 dark:border-slate-500`}>
          {topic.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopicComponent;
