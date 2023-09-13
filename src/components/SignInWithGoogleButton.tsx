import React, {useCallback, useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  User as GoogleButtonSigninUser,
} from '@react-native-google-signin/google-signin';
import {
  GoogleOneTapSignIn,
  User as GoogleOneTapSignInUser,
} from 'react-native-google-one-tap-signin';
import auth from '@react-native-firebase/auth';
import tw from '../../tailwind';
import {WEB_CLIENT_ID} from '@env';
import {View, useColorScheme} from 'react-native';

interface AuthProvider {
  configure: (config: {webClientId: string}) => void;
  hasPlayServices: (options: {
    showPlayServicesUpdateDialog: boolean;
  }) => Promise<boolean>;
  signIn: () => Promise<GoogleButtonSigninUser | GoogleOneTapSignInUser>;
}

export default function SignInWithGoogle() {
  const [isGoogleSignInButtonVisible, setIsGoogleSignInButtonVisible] =
    useState<boolean>(false);

  const authenticate = useCallback(async (authProvider: AuthProvider) => {
    authProvider.configure({
      webClientId: WEB_CLIENT_ID,
    });

    await authProvider.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await authProvider.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }, []);

  useEffect(() => {
    const signIn = async () => {
      try {
        await authenticate(GoogleOneTapSignIn);
      } catch (error: any) {
        setIsGoogleSignInButtonVisible(true);
        console.error(error);
      }
    };
    signIn();
  }, [authenticate]);

  const signIn = async () => {
    setIsGoogleSignInButtonVisible(false);
    try {
      await authenticate(GoogleSignin);
    } catch (error: any) {
      console.error(error);
    }
    setIsGoogleSignInButtonVisible(true);
  };

  const colorScheme = useColorScheme();

  return (
    <View style={isGoogleSignInButtonVisible ? tw`` : tw`opacity-0`}>
      <GoogleSigninButton
        style={tw`h-18`}
        size={GoogleSigninButton.Size.Wide}
        color={
          colorScheme === 'light'
            ? GoogleSigninButton.Color.Light
            : GoogleSigninButton.Color.Dark
        }
        onPress={signIn}
      />
    </View>
  );
}
