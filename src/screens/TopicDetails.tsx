import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  StatusBar,
  Text,
} from 'react-native';
import tw from '../../tailwind';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import SectionCard from '../components/SectionCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {Section} from '../Schemas';
import {realmContext} from '../RealmContext';

export type TopicDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TopicDetails'
>;

type TopicDetailsRouteProp = RouteProp<RootStackParamList, 'TopicDetails'>;

interface TopicDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'TopicDetails'> {
  route: TopicDetailsRouteProp;
}

const {useRealm, useQuery} = realmContext;

const TopicDetails: React.FC<TopicDetailsProps> = ({route, navigation}) => {
  const {t} = useTranslation();

  const {topic} = route.params;

  const realm = useRealm();

  const sections = useQuery(Section)
    .filtered('topic_id == $0', topic._id)
    .sorted('order');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(
        realm.objects(Section).filtered('topic_id == $0', topic._id),
        {
          name: 'sectionsSubscription' + topic._id.toString(),
        },
      );
    });
    navigation.setOptions({
      headerStyle: tw`bg-primary`,
      headerTitleStyle: tw`text-white`,
      headerTintColor: 'white',
    });
  }, [realm, topic, navigation]);

  const [currentPlayingVideoIndex, setCurrentVideoIndex] = useState(-1);

  const handleVideoTap = (index: number) => {
    setCurrentVideoIndex(prevIndex => {
      if (prevIndex === index) {
        return -1; // Stop the current video if tapped again
      } else {
        return index; // Set the index of the new video to play
      }
    });
  };

  const renderSection: ListRenderItem<Section> = ({item, index}) => (
    <SectionCard
      section={item}
      isPlaying={
        item.contentType === 'video' && index === currentPlayingVideoIndex
      }
      onPress={
        item.contentType === 'video' ? () => handleVideoTap(index) : undefined
      }
    />
  );

  return (
    <View style={tw`flex-1 bg-white dark:bg-black`}>
      <StatusBar backgroundColor="#2196F3" barStyle={'light-content'} />
      <SafeAreaView style={tw`flex-1`}>
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={item => item._id.toString()}
          maxToRenderPerBatch={3}
          initialNumToRender={3}
          contentContainerStyle={tw`pt-4`}
          ListEmptyComponent={
            <View style={tw`my-6 flex-1 justify-center items-center`}>
              <Text style={tw`text-slate-700 dark:text-slate-100 text-lg`}>
                {t('noSections')}
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default TopicDetails;
