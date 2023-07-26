import React from 'react';
import {SectionCardProps} from '../types';
import {contentRenderers} from './SectionContentTypeRenderers';

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  isPlaying,
  onPress,
}) => {
  const ContentComponent = contentRenderers[section.contentType];

  if (!ContentComponent) {
    return null;
  }

  return (
    <ContentComponent
      section={section}
      isPlaying={isPlaying}
      onPress={onPress}
    />
  );
};

export default SectionCard;
