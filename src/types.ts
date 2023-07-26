export type RootStackParamList = {
  Courses: {courses: Course[]};
  CourseDetails: {course: Course};
  TopicDetails: {topic: Topic};
};

export interface Course {
  id: number;
  name: string;
  topics: Topic[];
}

export interface Topic {
  id: number;
  name: string;
  sections: Section[];
}

type SectionContentTypes = 'video' | 'markdown' | 'pdf' | 'image' | 'svg';

export interface Section {
  id: number;
  title: string;
  dateCreated: Date;
  dateModified: Date;
  type: 'lecture' | 'assignment' | 'solution';
  contentType: SectionContentTypes;
  url: string;
}

export interface AssignmentSection extends Section {
  type: 'assignment';
  deadline: Date;
}
