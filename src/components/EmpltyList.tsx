import React from 'react';
import {View, Text} from 'react-native';
import tw from '../../tailwind';

interface EmptyListProps {
  message: string;
}

const EmptyList: React.FC<EmptyListProps> = ({message}) => {
  return (
    <View style={tw`my-6 flex-1 justify-center items-center`}>
      <Text style={tw`text-slate-700 dark:text-slate-100 text-lg`}>
        {message}
      </Text>
    </View>
  );
};

export default EmptyList;
