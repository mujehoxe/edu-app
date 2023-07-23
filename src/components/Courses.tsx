import React from 'react';
import {View, Text, FlatList} from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface Course {
  id: number;
  name: string;
}

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({courses}) => {
  const renderItem = ({item}: {item: Course}) => {
    return (
      <View style={tw`flex-row items-center p-4 border-b border-gray-300`}>
        {/* Replace 'your-icon' with the icon component */}
        <View style={tw`w-8 h-8 rounded-full bg-blue-500 mr-4`} />
        <Text style={tw`text-base`}>{item.name}</Text>
      </View>
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

export default CourseList;
