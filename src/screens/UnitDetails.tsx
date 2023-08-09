import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import tw from 'twrnc';
import {Block} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import BlockCard from '../components/BlockCard';
import {RouteProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useTranslation} from 'react-i18next';

type UnitDetailsRouteProp = RouteProp<RootStackParamList, 'UnitDetails'>;

interface UnitDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'UnitDetails'> {
  route: UnitDetailsRouteProp;
}

const UnitDetails: React.FC<UnitDetailsProps> = ({route}) => {
  const {t} = useTranslation();

  const {unit} = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Blocks')
      .where('unitId', '==', unit.id)
      .onSnapshot(querySnapshot => {
        const loadedBlocks: Block[] = querySnapshot.docs.map(
          documentSnapshot => {
            return {
              ...(documentSnapshot.data() as Block),
              id: documentSnapshot.id,
            };
          },
        );

        setBlocks(loadedBlocks);
        setIsLoading(false);
      });

    return () => subscriber();
  }, [unit]);

  const renderBlock = ({item}: {item: Block}) => (
    <View style={tw`px-4 py-3`}>
      <BlockCard block={item} />
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" style={tw`flex-1 justify-center`} />;
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={blocks}
        renderItem={renderBlock}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={tw`flex-1 pb-8`}
        ListEmptyComponent={
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-slate-700 text-lg`}>{t('noBlocks')}</Text>
          </View>
        }
      />
    </View>
  );
};

export default UnitDetails;
