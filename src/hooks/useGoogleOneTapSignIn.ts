import {useEffect} from 'react';
import {GoogleOneTapSignIn} from 'react-native-google-one-tap-signin';
import {useApp} from '@realm/react';
import {WEB_CLIENT_ID} from '@env';

const useGoogleOneTapSignIn = (
  setIsGoogleSignInButtonVisible: (value: boolean) => void,
) => {
  const app = useApp();

  useEffect(() => {
    GoogleOneTapSignIn.configure({
      webClientId: WEB_CLIENT_ID,
    });
    const login = async () => {
      try {
        await GoogleOneTapSignIn.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const {idToken} = await GoogleOneTapSignIn.signIn();
        const credentials = Realm.Credentials.google({idToken});
        await app.logIn(credentials);
      } catch (error: any) {
        setIsGoogleSignInButtonVisible(true);
        console.error(error);
      }
    };
    login();
  }, [app, setIsGoogleSignInButtonVisible]);
};

export default useGoogleOneTapSignIn;
