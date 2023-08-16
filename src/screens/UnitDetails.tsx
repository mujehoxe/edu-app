import React, {useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import tw from 'twrnc';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Block} from '../Schemas';
import {realmContext} from '../RealmContext';
import BlockCard from '../components/BlockCard';

type UnitDetailsRouteProp = RouteProp<RootStackParamList, 'UnitDetails'>;

interface UnitDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'UnitDetails'> {
  route: UnitDetailsRouteProp;
}

const {useRealm, useQuery} = realmContext;

const UnitDetails: React.FC<UnitDetailsProps> = ({route}) => {
  const {t} = useTranslation();

  const {unit} = route.params;

  const realm = useRealm();

  const blocks = useQuery(Block).filtered('unit_id == $0', unit._id);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(blocks, {name: 'blocksSubscription'});
    });
  }, [realm, blocks]);

  const renderBlock = ({item}: {item: Block}) => (
    <View style={tw`px-4 py-3`}>
      <BlockCard block={item} />
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={blocks}
        renderItem={renderBlock}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={tw`pb-8`}
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
