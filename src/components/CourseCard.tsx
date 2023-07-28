import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Course} from '../types';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

interface CourseProps {
  course: Course;
  navigation: NativeStackNavigationProp<any>;
}

const CourseCard: React.FC<CourseProps> = ({course, navigation}) => {
  return (
    <TouchableOpacity
      style={tw`flex-row items-center p-4 border-b border-gray-300 bg-white shadow-md rounded-md`}
      onPress={() => {
        navigation.navigate('CourseDetails', {course});
      }}>
      <View style={tw`flex-row items-center flex-1`}>
        <View style={tw`w-10 h-10 rounded-full bg-blue-500 mr-4`} />
        <Text style={tw`text-base text-slate-900 font-semibold flex-1`}>
          {course.name}
        </Text>
        <ChevronRightIcon style={tw`w-6 h-6 text-gray-600`} />
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;
