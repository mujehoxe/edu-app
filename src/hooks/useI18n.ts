import {useEffect} from 'react';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from '../../locales/en.json';
import arTranslation from '../../locales/ar.json';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: enTranslation},
    ar: {translation: arTranslation},
  },
  lng: 'ar-DZ',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const useI18n = () => {
  useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    !I18nManager.isRTL && RNRestart.restart();
  }, []);
};

export default useI18n;
