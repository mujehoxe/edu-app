import React from 'react';
import {View, FlatList, Text} from 'react-native';
import tw from 'twrnc';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import UnitCard from '../components/UnitCard';
import {Unit} from '../types';
import {useTranslation} from 'react-i18next';

interface UnitsProps {
  units: Unit[];
  navigation: NativeStackNavigationProp<any>;
}

const Units: React.FC<UnitsProps> = ({units, navigation}) => {
  const {t} = useTranslation();

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={units}
        renderItem={({item}) => (
          <View style={tw`px-4 py-3`}>
            <UnitCard unit={item} navigation={navigation} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={tw`pb-8`}
        ListEmptyComponent={
          <View style={tw`flex-1 justify-center items-center`}>
            <Text>{t('noUnits')}</Text>
          </View>
        }
      />
    </View>
  );
};

export default Units;
