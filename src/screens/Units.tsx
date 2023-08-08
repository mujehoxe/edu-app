import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import tw from 'twrnc';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import UnitCard from '../components/UnitCard';
import {useTranslation} from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import {Unit} from '../types';

interface UnitsProps {
  navigation: NativeStackNavigationProp<any>;
}

const Units: React.FC<UnitsProps> = ({navigation}) => {
  const {t} = useTranslation();

  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('Units')
      .onSnapshot(querySnapshot => {
        const loadedUnits: Unit[] = querySnapshot.docs.map(
          documentSnapshot => ({
            ...(documentSnapshot.data() as Unit),
            id: documentSnapshot.id,
          }),
        );

        setUnits(loadedUnits);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" style={tw`flex-1 justify-center`} />;
  }

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
