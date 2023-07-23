import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Courses from './src/components/Courses';
import Topics from './src/components/Topics';
import {RootStackParamList} from './src/types';

const coursesData = [
  {
    id: 1,
    name: 'Course 1',
    topics: [
      {id: 11, name: 'Topic 1.1'},
      {id: 12, name: 'Topic 1.2'},
      // Add more topics for Course 1 as needed
    ],
  },
  {
    id: 2,
    name: 'Course 2',
    topics: [
      {id: 21, name: 'Topic 2.1'},
      {id: 22, name: 'Topic 2.2'},
      // Add more topics for Course 2 as needed
    ],
  },
  // Add more courses as needed
];

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Courses">
        <Stack.Screen name="Courses">
          {({navigation}) => (
            <Courses courses={coursesData} navigation={navigation} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Topics"
          component={Topics}
          options={({route}) => ({
            title: route.params?.topics?.[0]?.name || 'Topics',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
