import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import tw from '../../tailwind';

export const LoadingIndicator = () => {
  return (
    <View style={tw`flex-1 flex-row justify-around p-3`}>
      <ActivityIndicator size="large" color={tw.color('primary')} />
    </View>
  );
};
