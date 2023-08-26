import React, {ReactElement, useEffect, useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import tw from '../../tailwind';
import useGoogleOneTapSignIn from '../hooks/useGoogleOneTapSignIn';
import SignInWithGoogle from '../components/SignInWithGoogleButton';

export function LogIn(): ReactElement {
  const [isGoogleSignInButtonVisible, setIsGoogleSignInButtonVisible] =
    useState<boolean>(false);

  useEffect(() => {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
  }, []);

  useGoogleOneTapSignIn(setIsGoogleSignInButtonVisible);

  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Text style={tw`text-3xl font-bold text-blue-500 mb-2`}>
        Welcome to Your Appp
      </Text>
      <Text style={tw`text-center text-lg text-gray-600 mb-6`}>
        Sign in to access your personalized experience.
      </Text>
      <View style={isGoogleSignInButtonVisible ? tw`` : tw`opacity-0`}>
        <SignInWithGoogle />
      </View>
    </View>
  );
}
