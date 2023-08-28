import React, {ReactElement} from 'react';
import {Text, View} from 'react-native';
import tw from '../../tailwind';
import SignInWithGoogle from '../components/SignInWithGoogleButton';

export function Login(): ReactElement {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white dark:bg-black`}>
      <Text style={tw`text-3xl font-bold text-primary mb-2`}>
        Welcome to Your App
      </Text>
      <Text
        style={tw`text-center text-lg text-gray-600 dark:text-gray-400 mb-6`}>
        Sign in to access your personalized experience.
      </Text>
      <SignInWithGoogle />
    </View>
  );
}
