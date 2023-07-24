import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Courses: {courses: Course[]};
  Topics: {topics: Topic[]};
};

export type TopicsScreenRouteProp = RouteProp<RootStackParamList, 'Topics'>;

export interface Course {
  id: number;
  name: string;
  topics: {id: number; name: string}[];
}

export interface Topic {
  id: number;
  name: string;
}
