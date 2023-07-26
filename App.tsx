import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Courses from './src/screens/Courses';
import CourseDetails from './src/screens/CourseDetails';
import {RootStackParamList} from './src/types';
import TopicDetails from './src/screens/TopicDetails';
import PdfView from './src/screens/PdfView';

const coursesData = [
  {
    id: 1,
    name: 'Course 1',
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
          name="CourseDetails"
          component={CourseDetails}
          options={({route}) => {
            const courseName = route.params.course.name;
            return {title: courseName};
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
