import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Courses: undefined;
  Topics: {topics: {id: number; name: string}[]};
};

export type TopicsScreenRouteProp = RouteProp<RootStackParamList, 'Topics'>;
