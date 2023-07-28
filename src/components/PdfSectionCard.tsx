import React from 'react';
import {SectionCardProps} from '../types';
import tw from 'twrnc';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PdfViewScreenNavigationProp} from '../screens/PdfView';
import {ArrowRightIcon, DocumentIcon} from 'react-native-heroicons/solid';

const PdfSectionCard: React.FC<SectionCardProps> = ({section}) => {
  const navigation = useNavigation<PdfViewScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PdfView', {section});
      }}
      style={tw`bg-white shadow-md rounded-md p-4 flex-col items-center justify-between`}>
      <View style={tw`flex-row items-center h-36`}>
        <DocumentIcon size={30} style={tw`mr-2 text-red-400`} />
        <Text style={tw`text-slate-900 text-base`}>Jump To PDF</Text>
      </View>
      <ArrowRightIcon size={30} color="teal" style={tw`text-teal-700`} />
    </TouchableOpacity>
  );
};

export default PdfSectionCard;
