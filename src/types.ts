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

interface Section {
  id: number;
  title: string;
  dateCreated: Date;
  dateModified: Date;
  type: 'lecture' | 'exercice' | 'solution';
  contentType: SectionContentTypes;
  url: string;
}
