import React from 'react';
import {View, Text, TouchableOpacity, I18nManager, Image} from 'react-native';
import tw from 'twrnc';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Unit} from '../types';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import {useTranslation} from 'react-i18next';

interface UnitProps {
  unit: Unit;
  navigation: NativeStackNavigationProp<any>;
}

const UnitCard: React.FC<UnitProps> = ({unit, navigation}) => {
  const isRTL = I18nManager.isRTL;
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      style={tw`flex-row items-center p-4 border-b border-gray-300 bg-white shadow-md rounded-md`}
      onPress={() => {
        navigation.navigate('UnitDetails', {unit});
      }}>
      <View style={tw`flex-row items-center flex-1`}>
        {unit.icon ? (
          <Image style={tw`w-14 h-14`} source={{uri: unit.icon}} />
        ) : (
          <XCircleIcon width={56} height={56} style={tw`text-black`} />
        )}
        <Text style={tw`text-base text-slate-900 ml-4 font-semibold flex-1`}>
          {t('unit') + unit.number + ': ' + unit.name}
        </Text>
        {isRTL ? (
          <ChevronLeftIcon style={tw`w-6 h-6 text-slate-600`} />
        ) : (
          <ChevronRightIcon style={tw`w-6 h-6 text-slate-600`} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UnitCard;
