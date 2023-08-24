import React, {useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import tw from 'twrnc';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import UnitCard from '../components/UnitCard';
import {useTranslation} from 'react-i18next';
import {realmContext} from '../RealmContext';
import {Unit} from '../Schemas';

interface UnitsProps {
  navigation: NativeStackNavigationProp<any>;
}

const {useRealm, useQuery} = realmContext;

const Units: React.FC<UnitsProps> = ({navigation}) => {
  const {t} = useTranslation();

  const realm = useRealm();

  const units = useQuery(Unit).sorted('number');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Unit), {name: 'unitsSubscription'});
    });
  }, [realm]);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={units}
        renderItem={({item}) => (
          <View style={tw`px-4 py-3`}>
            <UnitCard unit={item} navigation={navigation} />
          </View>
        )}
        keyExtractor={item => item._id.toString()}
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
