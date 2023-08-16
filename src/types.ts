import {OnProgressData} from 'react-native-video';
import {Topic, Unit} from './Schemas';

export type RootStackParamList = {
  Units: {};
  UnitDetails: {unit: Unit};
  TopicDetails: {topic: Topic};
  PdfView: {src: string};
  FullscreenVideoModal: {
    src: string;
    paused?: boolean;
    currentPlaybackTime: number;
    onProgress: (data: OnProgressData) => void;
  };
};

export interface Section {
  id: string;
  name: string;
  dateCreated?: Date;
  dateModified?: Date;
  type?: 'lecture' | 'assignment' | 'solution';
  contentType: SectionContentTypes;
  src: string;
}

export type SectionContentTypes =
  | 'video'
  | 'markdown'
  | 'pdf'
  | 'image'
  | 'svg';

export interface AssignmentSection extends Section {
  type: 'assignment';
  deadline: Date;
}

export interface SectionCardProps {
  section: Section;
  isPlaying?: boolean;
  onPress?: () => void;
}
