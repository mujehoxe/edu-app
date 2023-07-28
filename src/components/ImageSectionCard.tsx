import React from 'react';
import {SectionCardProps} from '../types';
import tw from 'twrnc';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

const ImageSectionCard: React.FC<SectionCardProps> = ({section}) => (
  <View style={tw`w-full h-72`}>
    <FastImage
      source={{uri: section.src}}
      style={tw`flex-1`}
      resizeMode={FastImage.resizeMode.contain}
    />
  </View>
);

export default ImageSectionCard;
