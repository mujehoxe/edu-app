import React from 'react';
import {View, FlatList} from 'react-native';
import tw from 'twrnc';
import {Topic} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import TopicCard from '../components/TopicCard';
import Error from '../components/ErrorComponent';
import {RouteProp} from '@react-navigation/native';

type CourseDetailsRouteProp = RouteProp<RootStackParamList, 'CourseDetails'>;

interface CourseDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'CourseDetails'> {
  route: CourseDetailsRouteProp;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({route, navigation}) => {
  const {course} = route.params;

  if (!course) {
    return <Error message="Course Not Found" />;
  }

  const renderTopic = ({item}: {item: Topic}) => (
    <TopicCard
      topic={item}
      onPress={() => navigation.navigate('TopicDetails', {topic: item})}
    />
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={course.topics}
        renderItem={renderTopic}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default CourseDetails;
