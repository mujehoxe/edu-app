import React from 'react';
import {View, FlatList} from 'react-native';
import tw from 'twrnc';
import TopicCard from '../components/TopicCard';
import {Course} from '../types';

interface CourseProps {
  route: {
    params: {
      course: Course;
    };
  };
}

const CourseDetails: React.FC<CourseProps> = ({route}) => {
  const {course} = route.params;

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={course.topics}
        renderItem={({item}) => <TopicCard topic={item} onPress={() => {}} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default CourseDetails;
