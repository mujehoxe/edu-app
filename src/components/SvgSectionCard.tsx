import React from 'react';
import {SectionCardProps} from '../types';
import tw from 'twrnc';
import {View} from 'react-native';
import {SvgUri} from 'react-native-svg';

const SvgSectionCard: React.FC<SectionCardProps> = ({section}) => (
  <View style={tw`bg-white shadow-md rounded-md overflow-hidden`}>
    <View style={tw`border border-gray-300`}>
      <SvgUri uri={section.src} width="100%" height="100%" fill="#000000" />
    </View>
  </View>
);

export default SvgSectionCard;
