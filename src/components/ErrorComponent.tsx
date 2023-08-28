import React from 'react';
import {View, Text} from 'react-native';
import tw from '../../tailwind';

interface ErrorScreenProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorScreenProps> = ({message}) => {
  return (
    <View>
      <View style={tw`bg-red-100 px-4 py-4 rounded-lg my-4`}>
        <Text style={tw`text-red-600 text-xl font-semibold`}>Error:</Text>
        <Text style={tw`text-red-600 text-base`}>{message}</Text>
      </View>
    </View>
  );
};

export default ErrorComponent;
