import React from 'react';
import {SectionCardProps, SectionContentTypes} from '../types';
import MarkdownSectionCard from './MarkdownSectionCard';
import VideoSectionCard from './VideoSectionCard';
import PdfSectionCard from './PdfSectionCard';
import ImageSectionCard from './ImageSectionCard';
import SvgSectionCard from './SvgSectionCard';

export const contentRenderers: {
  [key in SectionContentTypes]: React.FC<SectionCardProps>;
} = {
  video: VideoSectionCard,
  markdown: MarkdownSectionCard,
  image: ImageSectionCard,
  svg: SvgSectionCard,
  pdf: PdfSectionCard,
};
