import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Courses: {courses: Course[]};
  Course: {course: Course};
};

export type CourseScreenRouteProp = RouteProp<RootStackParamList, 'Course'>;

export interface Course {
  id: number;
  name: string;
  topics: {id: number; name: string}[];
}

export interface Topic {
  id: number;
  name: string;
}
