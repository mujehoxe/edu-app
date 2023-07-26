import React, {useRef} from 'react';
import {useEffect, useState} from 'react';
import {SectionCardProps, SectionContentTypes} from '../types';
import tw from 'twrnc';
import Markdown from '@ronradtke/react-native-markdown-display';
import {View, Image} from 'react-native';
import {SvgUri} from 'react-native-svg';
import Video from 'react-native-video';
import {TouchableOpacity} from 'react-native';
import Pdf from 'react-native-pdf';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const MarkdownSection: React.FC<SectionCardProps> = ({section}) => {
  const [markdownContent, setMarkdownContent] = useState(String);

  useEffect(() => {
    if (section.contentType === 'markdown' && !markdownContent) {
      fetchRemoteMarkdownContent(section.src)
        .then(content => setMarkdownContent(content))
        .catch(error => setMarkdownContent(error));
    }
  }, [section, markdownContent]);

  const fetchRemoteMarkdownContent = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.text();
    } catch (error) {
      throw new Error('Error fetching remote Markdown content:' + error);
    }
  };

  const markdownStyles = {
    text: tw`text-slate-950 text-lg`,
  };
  return <Markdown style={markdownStyles}>{markdownContent}</Markdown>;
};

interface VideoSectionCardProps extends SectionCardProps {
  isPlaying: boolean;
  onPress: () => void;
}

export const VideoSectionCard: React.FC<VideoSectionCardProps> = ({
  section,
  isPlaying,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Video
      source={{uri: section.src}}
      style={tw`bg-slate-950 w-full h-72`}
      paused={!isPlaying}
      muted
      repeat
    />
  </TouchableOpacity>
);

export const ImageSectionCard: React.FC<SectionCardProps> = ({section}) => (
  <View style={tw`w-full h-72`}>
    <Image
      source={{uri: section.src}}
      style={tw`flex-1`}
      resizeMode="contain"
    />
  </View>
);

export const PdfSectionCard: React.FC<SectionCardProps> = ({section}) => {
  const pdfRef = useRef(null);

  const handlePdfTouch = (e: Event) => {
    e.stopPropagation();
  };

  return (
    <View style={tw`flex-1 justify-start items-center mt-2`}>
      <Pdf
        ref={pdfRef}
        source={{uri: section.src}}
        trustAllCerts={false}
        onTouchStart={handlePdfTouch}
        onTouchMove={handlePdfTouch}
        style={[tw`flex-1`, {width: wp('80%'), height: hp('50%')}]}
      />
    </View>
  );
};

export const SvgSectionCard: React.FC<SectionCardProps> = ({section}) => (
  <View style={tw`w-full h-72`}>
    <SvgUri uri={section.src} width="100%" height="100%" fill="#000000" />
  </View>
);

export const contentRenderers: {
  [key in SectionContentTypes]: React.FC<SectionCardProps>;
} = {
  video: VideoSectionCard,
  markdown: MarkdownSection,
  image: ImageSectionCard,
  svg: SvgSectionCard,
  pdf: PdfSectionCard,
};
