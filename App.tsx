import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Units from './src/screens/Units';
import UnitDetails from './src/screens/UnitDetails';
import {RootStackParamList} from './src/types';
import TopicDetails from './src/screens/TopicDetails';
import PdfView from './src/screens/PdfView';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';
import {useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

const unitsData = [
  {
    id: 1,
    name: 'الوحدة 1',
    topics: [
      {
        id: 11,
        name: 'الموضوع 1.1',
        sections: [
          {title: 'المقطع 1', type: 'lecture'},
          {title: '2 المقطع', type: 'solution'},
        ],
      },
      {id: 12, name: 'الموضوع 1.2'},
      // Add more topics for Unit 1 as needed
    ],
  },
  {
    id: 2,
    name: 'الوحدة 2',
    topics: [
      {id: 21, name: 'الموضوع 2.1'},
      {id: 22, name: 'الموضوع 2.2'},
      // Add more topics for Unit 2 as needed
    ],
  },
  // Add more units as needed
];

const Stack = createNativeStackNavigator<RootStackParamList>();

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

const App: React.FC = () => {
  const {t} = useTranslation();

  useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    !I18nManager.isRTL && RNRestart.restart();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Units">
        <Stack.Screen name="Units" options={{title: t('unitsTitle')}}>
          {({navigation}) => (
            <Units units={unitsData} navigation={navigation} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="UnitDetails"
          component={UnitDetails}
          options={({route}) => {
            const unitName = route.params.unit.name;
            return {title: t('unitDetailsTitle') + unitName};
          }}
        />
        <Stack.Screen
          name="TopicDetails"
          component={TopicDetails}
          options={({route}) => {
            const topicName = route.params.topic.name;
            return {title: topicName};
          }}
        />
        <Stack.Screen
          name="PdfView"
          component={PdfView}
          options={{title: '', headerTransparent: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
