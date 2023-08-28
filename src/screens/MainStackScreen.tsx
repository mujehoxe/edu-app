import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Units from './Units';
import UnitDetails from './UnitDetails';
import TopicDetails from './TopicDetails';
import PdfView from './PdfView';
import {useTranslation} from 'react-i18next';
import {RootStack} from '../MainApp';
import {ColorSchemeSwitch} from '../components/ColorSchemeSwitch';

const MainStack = createNativeStackNavigator();
export const MainStackScreen: React.FC = () => {
  const {t} = useTranslation();

  const renderSwitch = React.useMemo(() => <ColorSchemeSwitch />, []);

  return (
    <MainStack.Navigator>
      <RootStack.Screen
        name="Units"
        options={{
          title: t('unitsTitle'),
          headerRight: () => renderSwitch,
        }}>
        {({navigation}) => <Units navigation={navigation} />}
      </RootStack.Screen>
      <RootStack.Screen
        name="UnitDetails"
        component={UnitDetails}
        options={({route}) => {
          const unitName = route.params.unit.name;
          return {title: unitName, headerLargeTitle: true};
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
