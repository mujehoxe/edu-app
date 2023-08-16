import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import tw from 'twrnc';
import TopicCard from './TopicCard';
import {useTranslation} from 'react-i18next';
import {Block, Topic} from '../Schemas';
import {realmContext} from '../RealmContext';

export interface BlockCardProps {
  block: Block;
}

const {useRealm, useQuery} = realmContext;

const BlockCard: React.FC<BlockCardProps> = ({block}) => {
  const {t} = useTranslation();

  const realm = useRealm();

  const topics = useQuery(Topic).filtered('block_id == $0', block._id);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(
        realm.objects(Topic).filtered('block_id == $0', block._id),
        {
          name: 'topicsSubscription' + block._id.toString(),
        },
      );
    });
  }, [realm, topics, block]);

  const renderTopic = ({item}: {item: Topic}) => (
    <View style={tw`px-4 py-3`}>
      <TopicCard topic={item} />
    </View>
  );

  return (
    <View style={tw`bg-white shadow-md rounded-md`}>
      <View style={tw`bg-gray-100 p-4 border-b border-gray-300 rounded-t-md`}>
        <Text style={tw`text-lg font-semibold text-slate-900`}>
          {block.name}
        </Text>
      </View>
      <FlatList
        data={topics}
        renderItem={renderTopic}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={tw`flex-1 pb-8`}
        ListEmptyComponent={
          <View style={tw`flex-1 justify-center items-center`}>
            <Text>{t('noTopics')}</Text>
          </View>
        }
      />
    </View>
  );
};

export default BlockCard;
