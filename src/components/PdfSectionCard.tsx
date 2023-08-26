import React from 'react';
import {SectionCardProps} from '../types';
import tw from '../../tailwind';
import {I18nManager, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PdfViewScreenNavigationProp} from '../screens/PdfView';
import {ArrowRightIcon, DocumentIcon} from 'react-native-heroicons/solid';
import {useTranslation} from 'react-i18next';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

const PdfSectionCard: React.FC<SectionCardProps> = ({section}) => {
  const navigation = useNavigation<PdfViewScreenNavigationProp>();
  const {t} = useTranslation();
  const isRtl = I18nManager.isRTL;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PdfView', {src: section.src});
      }}
      style={tw`bg-white shadow-md rounded-md p-4 flex-col items-center justify-between`}>
      <View style={tw`flex-row items-center h-36`}>
        <DocumentIcon size={30} style={tw`mr-2 text-red-400`} />
        <Text style={tw`text-slate-900 text-lg`}>{t('jumpToPDF')}</Text>
      </View>
      {isRtl ? (
        <ArrowLeftIcon size={30} color="teal" style={tw`text-teal-700`} />
      ) : (
        <ArrowRightIcon size={30} color="teal" style={tw`text-teal-700`} />
      )}
    </TouchableOpacity>
  );
};

export default PdfSectionCard;
