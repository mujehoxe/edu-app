import React from 'react';
import {View, Text, TouchableOpacity, I18nManager, Image} from 'react-native';
import tw from '../../tailwind';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import {useTranslation} from 'react-i18next';
import {Unit} from '../types';

interface UnitProps {
  unit: Unit;
  navigation: NativeStackNavigationProp<any>;
}

const UnitCard: React.FC<UnitProps> = ({unit, navigation}) => {
  const isRTL = I18nManager.isRTL;
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      style={tw`flex-row items-center p-4 rounded-md
        border-b border-gray-300
        dark:bg-slate-800 dark:border-b-0`}
      onPress={() => {
        navigation.navigate('UnitDetails', {unit});
      }}>
      <View style={tw`flex-row items-center flex-1`}>
        {unit.iconSrc ? (
          <Image style={tw`w-14 h-14`} source={{uri: unit.iconSrc}} />
        ) : (
          <XCircleIcon
            width={56}
            height={56}
            style={tw`text-black dark:text-slate-100`}
          />
        )}
        <Text
          style={tw`text-base text-slate-900 dark:text-slate-100 ml-4 font-semibold flex-1`}>
          {t('unit') + unit.number + ': ' + unit.name}
        </Text>
        {isRTL ? (
          <ChevronLeftIcon
            style={tw`w-6 h-6 text-slate-600 dark:text-slate-400`}
          />
        ) : (
          <ChevronRightIcon
            style={tw`w-6 h-6 text-slate-600 dark:text-slate-400`}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UnitCard;
