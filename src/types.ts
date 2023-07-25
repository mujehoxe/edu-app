export type RootStackParamList = {
  Courses: {courses: Course[]};
  CourseDetails: {course: Course};
  TopicDetails: {topic: Topic};
};

export interface Course {
  id: number;
  name: string;
  topics: {id: number; name: string}[];
}

export interface Topic {
  id: number;
  name: string;
}
