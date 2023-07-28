import React from 'react';
import {SectionCardProps, SectionContentTypes} from '../types';
import tw from 'twrnc';
import {View, Image} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PdfViewScreenNavigationProp} from '../screens/PdfView';
import {MarkdownSectionCard} from './MarkdownSectionCard';
import {VideoSectionCard} from './VideoSectionCard';

export const ImageSectionCard: React.FC<SectionCardProps> = ({section}) => (
  <View style={tw`w-full h-72`}>
    <Image
      source={{uri: section.src}}
      style={tw`flex-1`}
      resizeMode="contain"
    />
  </View>
);

export const SvgSectionCard: React.FC<SectionCardProps> = ({section}) => (
  <View style={tw`w-full h-72`}>
    <SvgUri uri={section.src} width="100%" height="100%" fill="#000000" />
  </View>
);

export const PdfSectionCard: React.FC<SectionCardProps> = ({section}) => {
  const navigation = useNavigation<PdfViewScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PdfView', {section});
      }}>
      <Text style={tw`text-slate-950`}>{section.src}</Text>
    </TouchableOpacity>
  );
};

export const contentRenderers: {
  [key in SectionContentTypes]: React.FC<SectionCardProps>;
} = {
  video: VideoSectionCard,
  markdown: MarkdownSectionCard,
  image: ImageSectionCard,
  svg: SvgSectionCard,
  pdf: PdfSectionCard,
};
