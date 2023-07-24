import React from 'react';
import {View, FlatList} from 'react-native';
import tw from 'twrnc';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CourseComponent from '../components/Course';
import {Course} from '../types';

interface CoursesProps {
  courses: Course[];
  navigation: NativeStackNavigationProp<any>;
}

const Courses: React.FC<CoursesProps> = ({courses, navigation}) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={courses}
        renderItem={({item}) => (
          <CourseComponent course={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Courses;
