import React, {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Realm from 'realm';
import {useApp} from '@realm/react';
import tw from 'twrnc';
import {WEB_CLIENT_ID} from '@env';

export default function SignInWithGoogle() {
  const [isSigninInProgress, setSigninInProgress] = useState(false);
  const app = useApp();

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });

  const signIn = async () => {
    setSigninInProgress(true);
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const credentials = Realm.Credentials.google({idToken});
      await app.logIn(credentials);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.error('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error('play services not available or outdated');
      } else {
        console.error('some other error happened', error);
      }
    } finally {
      setSigninInProgress(false);
    }
  };

  return (
    <GoogleSigninButton
      style={tw`h-18`}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={signIn}
      disabled={isSigninInProgress}
    />
  );
}
