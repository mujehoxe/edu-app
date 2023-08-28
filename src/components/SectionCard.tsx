import React from 'react';
import {
  AssignmentSection,
  SectionCardProps,
  SectionContentTypes,
} from '../types';
import ErrorComponent from './ErrorComponent';
import {Text, View} from 'react-native';
import tw from '../../tailwind';
import {useTranslation} from 'react-i18next';
import ImageSectionCard from './ImageSectionCard';
import MarkdownSectionCard from './MarkdownSectionCard';
import PdfSectionCard from './PdfSectionCard';
import VideoSectionCard from './VideoSectionCard';
import SvgSectionCard from './SvgSectionCard';

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  isPlaying,
  onPress,
}) => {
  const {t, i18n} = useTranslation();
  const formatter = new Intl.DateTimeFormat(i18n.languages[0], {
    dateStyle: 'full',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  const ContentComponent = contentRenderers[section.contentType];

  if (!ContentComponent) {
    return <ErrorComponent message="Unsupported Content Type" />;
  }

  const assignmentSection = section as AssignmentSection;

  return (
    <View
      style={tw`bg-white dark:bg-slate-800 shadow-md rounded-md mb-4 overflow-hidden`}>
      <View
        style={tw`bg-gray-100 dark:bg-slate-700 p-4 border-b border-gray-300 rounded-t-md`}>
        <Text
          style={tw`text-lg font-semibold text-slate-900 dark:text-slate-100`}>
          {section.name}
        </Text>
      </View>
      <ContentComponent
        section={section}
        isPlaying={isPlaying}
        onPress={onPress}
      />
      {assignmentSection.deadline && (
        <View style={tw`p-4 bg-red-100 border-t border-gray-300 rounded-b-md`}>
          <Text style={tw`text-right text-red-600 text-base font-semibold`}>
            {t('deadline') + formatter.format(assignmentSection.deadline)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SectionCard;

const contentRenderers: {
  [key in SectionContentTypes]: React.FC<SectionCardProps>;
} = {
  video: VideoSectionCard,
  markdown: MarkdownSectionCard,
  image: ImageSectionCard,
  svg: SvgSectionCard,
  pdf: PdfSectionCard,
};
