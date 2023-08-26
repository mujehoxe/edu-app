import React, {ReactElement, useEffect, useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import tw from '../../tailwind';
import useGoogleOneTapSignIn from '../hooks/useGoogleOneTapSignIn';
import SignInWithGoogle from '../components/SignInWithGoogleButton';
import {useAppColorScheme} from 'twrnc';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export function Login(): ReactElement {
  const [isGoogleSignInButtonVisible, setIsGoogleSignInButtonVisible] =
    useState<boolean>(false);

  const [colorScheme] = useAppColorScheme(tw);

  useEffect(() => {
    if (colorScheme === 'light') {
      SystemNavigationBar.setNavigationColor('white');
      StatusBar.setBarStyle('dark-content');
    } else {
      SystemNavigationBar.setNavigationColor('black');
      StatusBar.setBarStyle('light-content');
    }
  }, [colorScheme]);

  useGoogleOneTapSignIn(setIsGoogleSignInButtonVisible);

  return (
    <View style={tw`flex-1 justify-center items-center bg-white dark:bg-black`}>
      <Text style={tw`text-3xl font-bold text-primary mb-2`}>
        Welcome to Your App
      </Text>
      <Text
        style={tw`text-center text-lg text-gray-600 dark:text-gray-400 mb-6`}>
        Sign in to access your personalized experience.
      </Text>
      <View style={isGoogleSignInButtonVisible ? tw`` : tw`opacity-0`}>
        <SignInWithGoogle />
      </View>
    </View>
  );
}
