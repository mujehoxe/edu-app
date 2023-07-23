import React from 'react';
import {View} from 'react-native';
import Courses from './src/components/Courses';

const coursesData = [
  {id: 1, name: 'Course 1'},
  {id: 2, name: 'Course 2'},
  {id: 3, name: 'Course 3'},
  // Add more courses as needed
];

const App: React.FC = () => {
  return (
    <View className="flex-1">
      <Courses courses={coursesData} />
    </View>
  );
};

export default App;
