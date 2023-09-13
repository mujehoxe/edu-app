import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import tw from '../../tailwind';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import UnitCard from '../components/UnitCard';
import {useTranslation} from 'react-i18next';
import {useDeviceContext} from 'twrnc';
import {LoadingIndicator} from '../components/LoadingIndicator';
import firestore from '@react-native-firebase/firestore';
import {Unit} from '../types';

interface UnitsProps {
  navigation: NativeStackNavigationProp<any>;
}

const Units: React.FC<UnitsProps> = ({navigation}) => {
  const {t} = useTranslation();

  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Units')
      .orderBy('number')
      .onSnapshot(querySnapshot => {
        setUnits(
          querySnapshot.docs.map(documentSnapshot => ({
            ...(documentSnapshot.data() as Unit),
            id: documentSnapshot.id,
          })),
        );

        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  useDeviceContext(tw);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={tw`flex-1 bg-white dark:bg-black pt-4`}>
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
          <View style={tw`my-6 flex-1 justify-center items-center`}>
            <Text>{t('noUnits')}</Text>
          </View>
        }
      />
    </View>
  );
};

export default Units;
