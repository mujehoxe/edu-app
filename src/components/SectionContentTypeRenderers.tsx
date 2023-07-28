import React from 'react';
import {SectionCardProps, SectionContentTypes} from '../types';
import tw from 'twrnc';
import {View, Image} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {MarkdownSectionCard} from './MarkdownSectionCard';
import {VideoSectionCard} from './VideoSectionCard';
import {PdfSectionCard} from './PdfSectionCard';
import {ImageSectionCard} from './ImageSectionCard';

export const SvgSectionCard: React.FC<SectionCardProps> = ({section}) => (
  <View style={tw`w-full h-72`}>
    <SvgUri uri={section.src} width="100%" height="100%" fill="#000000" />
  </View>
);

export const contentRenderers: {
  [key in SectionContentTypes]: React.FC<SectionCardProps>;
} = {
  video: VideoSectionCard,
  markdown: MarkdownSectionCard,
  image: ImageSectionCard,
  svg: SvgSectionCard,
  pdf: PdfSectionCard,
};
