import React from 'react';
import {View, FlatList} from 'react-native';
import tw from 'twrnc';
import {Topic} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import TopicCard from '../components/TopicCard';
import ErrorComponent from '../components/ErrorComponent';
import {RouteProp} from '@react-navigation/native';

type CourseDetailsRouteProp = RouteProp<RootStackParamList, 'CourseDetails'>;

interface CourseDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'CourseDetails'> {
  route: CourseDetailsRouteProp;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({route, navigation}) => {
  const {course} = route.params;

  if (!course) {
    return <ErrorComponent message="Course Not Found" />;
  }

  const renderTopic = ({item}: {item: Topic}) => (
    <View style={tw`px-4 py-3`}>
      <TopicCard
        topic={item}
        onPress={() => navigation.navigate('TopicDetails', {topic: item})}
      />
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={course.topics}
        renderItem={renderTopic}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={tw`pb-8`}
      />
    </View>
  );
};

export default CourseDetails;
