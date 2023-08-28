import React from 'react';
import {SectionCardProps} from '../types';
import tw from '../../tailwind';
import {View} from 'react-native';
import {SvgUri} from 'react-native-svg';

const SvgSectionCard: React.FC<SectionCardProps> = ({section}) => (
  <View style={tw`w-full h-72`}>
    <SvgUri uri={section.src} width="100%" height="100%" fill="#000000" />
  </View>
);

export default SvgSectionCard;
