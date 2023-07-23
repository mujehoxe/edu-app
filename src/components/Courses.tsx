import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Course {
  id: number;
  name: string;
  topics: Topic[];
}

interface Topic {
  id: number;
  name: string;
}

interface CoursesProps {
  courses: Course[];
  navigation: NativeStackNavigationProp<any>;
}

const Courses: React.FC<CoursesProps> = ({courses, navigation}) => {
  const renderItem = ({item}: {item: Course}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Topics', {topics: item.topics})}>
        <View style={tw`flex-row items-center p-4 border-b border-gray-300`}>
          <View style={tw`w-8 h-8 rounded-full bg-blue-500 mr-4`} />
          <Text style={tw`text-base`}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Courses;
