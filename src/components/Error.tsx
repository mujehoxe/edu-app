import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

interface ErrorScreenProps {
  message: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({message}) => {
  return (
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      <Text style={tw`text-red-500 text-xl font-bold`}>{message}</Text>
    </View>
  );
};

export default ErrorScreen;
