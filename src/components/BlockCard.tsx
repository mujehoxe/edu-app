import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import tw from '../../tailwind';
import TopicCard from './TopicCard';
import {useTranslation} from 'react-i18next';
import {Block, Topic} from '../types';
import firestore from '@react-native-firebase/firestore';

export interface BlockCardProps {
  block: Block;
}

const BlockCard: React.FC<BlockCardProps> = ({block}) => {
  const {t} = useTranslation();

  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Blocks')
      .doc(block.id)
      .collection('Topics')
      .orderBy('order')
      .onSnapshot(querySnapshot => {
        const loadedTopics: Topic[] = querySnapshot.docs.map(
          documentSnapshot => {
            return {
              ...(documentSnapshot.data() as Topic),
              id: documentSnapshot.id,
            };
          },
        );

        setTopics(loadedTopics);
      });

    return () => subscriber();
  }, [block.id]);

  const renderTopic = ({item}: {item: Topic}) => (
    <View style={tw`px-4 py-3`}>
      <TopicCard topic={item} />
    </View>
  );

  return (
    <View style={tw`bg-white dark:bg-slate-800 shadow-md rounded-md`}>
      <View
        style={tw`bg-gray-50 dark:bg-slate-700 p-4 border-b border-gray-300 rounded-t-md`}>
        <Text
          style={tw`text-lg font-semibold text-slate-900 dark:text-slate-100`}>
          {block.name}
        </Text>
      </View>
      <FlatList
        data={topics}
        renderItem={renderTopic}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={tw`my-auto pb-8`}
        ListEmptyComponent={
          <View style={tw`my-6 flex-1 justify-center items-center`}>
            <Text>{t('noTopics')}</Text>
          </View>
        }
      />
    </View>
  );
};

export default BlockCard;
