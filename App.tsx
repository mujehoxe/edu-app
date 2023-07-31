import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Units from './src/screens/Units';
import UnitDetails from './src/screens/UnitDetails';
import {RootStackParamList} from './src/types';
import TopicDetails from './src/screens/TopicDetails';
import PdfView from './src/screens/PdfView';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';

const unitsData = [
  {
    id: 1,
    name: 'Unit 1',
    topics: [
      {
        id: 11,
        name: 'Topic 1.1',
        sections: [
          {title: 'section1', type: 'lecture'},
          {title: 'section2', type: 'solution'},
        ],
      },
      {id: 12, name: 'Topic 1.2'},
      // Add more topics for Unit 1 as needed
    ],
  },
  {
    id: 2,
    name: 'Unit 2',
    topics: [
      {id: 21, name: 'Topic 2.1'},
      {id: 22, name: 'Topic 2.2'},
      // Add more topics for Unit 2 as needed
    ],
  },
  // Add more units as needed
];

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: enTranslation},
    ar: {translation: arTranslation},
  },
  lng: 'ar',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Units">
        <Stack.Screen name="Units" options={{title: 'Browse Units'}}>
          {({navigation}) => (
            <Units units={unitsData} navigation={navigation} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="UnitDetails"
          component={UnitDetails}
          options={({route}) => {
            const unitName = route.params.unit.name;
            return {title: unitName};
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
          options={({route}) => {
            const pdfName = route.params.section.title;
            return {title: pdfName};
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
