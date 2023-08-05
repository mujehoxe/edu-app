import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Units from './src/screens/Units';
import UnitDetails from './src/screens/UnitDetails';
import {RootStackParamList, Unit} from './src/types';
import TopicDetails from './src/screens/TopicDetails';
import PdfView from './src/screens/PdfView';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';
import {useTranslation} from 'react-i18next';
import {I18nManager, StatusBar} from 'react-native';
import RNRestart from 'react-native-restart';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import FullscreenVideoModal from './src/screens/FullscreenVideoModal';
import Orientation from 'react-native-orientation-locker';
import {clearCache} from 'react-native-video-cache-control';

const unitsData: Unit[] = [
  {
    id: 1,
    number: 1,
    name: 'المتابعة الزمنية لتحول كيميائي في وسط مائي',
    icon: require('./src/assets/unitIcon.png'),
    blocks: [
      {
        id: 1,
        name: 'المجموعة 1',
        topics: [
          {
            id: 11,
            name: 'الموضوع 1.1',
          },
          {id: 12, name: 'الموضوع 1.2'},
          // Add more topics for Unit 1 as needed
        ],
      },
      {
        id: 2,
        name: 'المجموعة 2',
        topics: [
          {
            id: 11,
            name: 'الموضوع 1.1',
          },
          {id: 12, name: 'الموضوع 1.2'},
          // Add more topics for Unit 1 as needed
        ],
      },
    ],
  },
  {
    id: 2,
    number: 2,
    name: 'المتابعة الزمنية لتحول كيميائي في وسط مائي',
    blocks: [
      {
        id: 1,
        name: 'المجموعة 1',
        topics: [
          {
            id: 11,
            name: 'الموضوع 1.1',
          },
          {id: 12, name: 'الموضوع 1.2'},
          // Add more topics for Unit 1 as needed
        ],
      },
      {
        id: 2,
        name: 'المجموعة 2',
        topics: [
          {
            id: 11,
            name: 'الموضوع 1.1',
          },
          {id: 12, name: 'الموضوع 1.2'},
          // Add more topics for Unit 1 as needed
        ],
      },
    ],
  },
  // Add more units as needed
];

const RootStack = createNativeStackNavigator<RootStackParamList>();

const MainStack = createNativeStackNavigator();

const MainStackScreen: React.FC = () => {
  const {t} = useTranslation();

  return (
    <MainStack.Navigator>
      <RootStack.Screen name="Units" options={{title: t('unitsTitle')}}>
        {({navigation}) => <Units units={unitsData} navigation={navigation} />}
      </RootStack.Screen>
      <RootStack.Screen
        name="UnitDetails"
        component={UnitDetails}
        options={({route}) => {
          const unitName = route.params.unit.name;
          return {title: unitName};
        }}
      />
      <RootStack.Screen
        name="TopicDetails"
        component={TopicDetails}
        options={({route}) => {
          const topicName = route.params.topic.name;
          return {title: topicName};
        }}
      />
      <RootStack.Screen
        name="PdfView"
        component={PdfView}
        options={{title: ''}}
      />
    </MainStack.Navigator>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    clearCache();
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    !I18nManager.isRTL && RNRestart.restart();
    SystemNavigationBar.setNavigationColor('#FFF', 'light');
    SystemNavigationBar.setNavigationBarDividerColor('#CACACA');
    Orientation.lockToPortrait();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <RootStack.Navigator
        initialRouteName="Units"
        screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="FullscreenVideoModal"
          component={FullscreenVideoModal}
          options={{title: '', headerTransparent: true}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

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
