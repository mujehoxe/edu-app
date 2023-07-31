import React from 'react';
import {View, Text, TouchableOpacity, I18nManager} from 'react-native';
import tw from 'twrnc';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Unit} from '../types';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';

interface UnitProps {
  unit: Unit;
  navigation: NativeStackNavigationProp<any>;
}

const UnitCard: React.FC<UnitProps> = ({unit, navigation}) => {
  const isRTL = I18nManager.isRTL;

  return (
    <TouchableOpacity
      style={tw`flex-row items-center p-4 border-b border-gray-300 bg-white shadow-md rounded-md`}
      onPress={() => {
        navigation.navigate('UnitDetails', {unit});
      }}>
      <View style={tw`flex-row items-center flex-1`}>
        <View
          style={tw`w-10 h-10 rounded-full ${
            isRTL ? 'mr-4' : 'ml-4'
          } bg-blue-500`}
        />
        <Text
          style={tw`text-base text-slate-900 font-semibold flex-1 ${
            isRTL ? 'text-left' : 'text-right'
          }`}>
          {unit.name}
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
