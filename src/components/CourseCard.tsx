import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Course} from '../types';

interface CourseProps {
  course: Course;
  navigation: NativeStackNavigationProp<any>;
}

const CourseComponent: React.FC<CourseProps> = ({course, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CourseDetails', {course});
      }}>
      <View style={tw`flex-row items-center p-4 border-b border-gray-300`}>
        <View style={tw`w-8 h-8 rounded-full bg-blue-500 mr-4`} />
        <Text style={tw`text-base text-slate-900`}>{course.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseComponent;
