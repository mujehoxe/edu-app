import {OnProgressData} from 'react-native-video';

export type RootStackParamList = {
  Units: {units: Unit[]};
  UnitDetails: {unit: Unit};
  TopicDetails: {topic: Topic};
  PdfView: {section: Section};
  FullscreenVideoModal: {
    src: string;
    paused?: boolean;
    currentPlaybackTime: number;
    onProgress: (data: OnProgressData) => void;
  };
};

export interface Unit {
  id: number;
  number: number;
  name: string;
  icon?: string;
  blocks: Block[];
}

export interface Block {
  id: number;
  name: string;
  topics: Topic[];
}

export interface Topic {
  id: number;
  name: string;
  sections?: Section[];
}

export type SectionContentTypes =
  | 'video'
  | 'markdown'
  | 'pdf'
  | 'image'
  | 'svg';

export interface Section {
  id: number;
  title: string;
  dateCreated?: Date;
  dateModified?: Date;
  type?: 'lecture' | 'assignment' | 'solution';
  contentType: SectionContentTypes;
  src: string;
}

export interface AssignmentSection extends Section {
  type: 'assignment';
  deadline: Date;
}

export interface SectionCardProps {
  section: Section;
  isPlaying?: boolean;
  onPress?: () => void;
}
