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
      style={tw`px-2 h-52 flex-col items-center justify-center gap-12`}>
      <View style={tw`flex-row items-center justify-center gap-4`}>
        <DocumentIcon size={30} style={tw`text-red-400`} />
        <Text style={tw`text-slate-900 dark:text-slate-100 text-lg`}>
          {t('jumpToPDF')}
        </Text>
      </View>
      <View>
        {isRtl ? (
          <ArrowLeftIcon
            size={30}
            style={tw`text-teal-700 dark:text-teal-300`}
          />
        ) : (
          <ArrowRightIcon
            size={30}
            style={tw`text-teal-700 dark:text-teal-300`}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PdfSectionCard;
