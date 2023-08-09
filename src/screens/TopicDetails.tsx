import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AssignmentSection, RootStackParamList, Section} from '../types';
import {VideoSection} from '../components/VideoSectionCard';
import SectionCard from '../components/SectionCard';
import {StackNavigationProp} from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import {useTranslation} from 'react-i18next';

export type TopicDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TopicDetails'
>;

type TopicDetailsRouteProp = RouteProp<RootStackParamList, 'TopicDetails'>;

interface TopicDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'TopicDetails'> {
  route: TopicDetailsRouteProp;
}

const TopicDetails: React.FC<TopicDetailsProps> = ({route, navigation}) => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const {topic} = route.params;

  const [sections, setSections] = useState<
    (Section | VideoSection | AssignmentSection)[]
  >([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Sections')
      .where('topicId', '==', topic.id)
      .onSnapshot(querySnapshot => {
        const loadedSections: Section[] = querySnapshot.docs.map(
          documentSnapshot => {
            return {
              ...(documentSnapshot.data() as Section),
              id: documentSnapshot.id,
            };
          },
        );

        setSections(loadedSections);
        setIsLoading(false);
      });

    return () => subscriber();
  }, [topic.id]);

  const [currentPlayingVideoIndex, setCurrentVideoIndex] = useState(-1);
  navigation.setOptions({
    headerStyle: tw`bg-[#2196F3]`,
    headerTitleStyle: tw`text-[#FFF]`,
    headerTintColor: 'white',
  });

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

  if (isLoading) {
    return <ActivityIndicator size="large" style={tw`flex-1 justify-center`} />;
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar backgroundColor="#2196F3" barStyle={'light-content'} />
      <SafeAreaView style={tw`flex-1`}>
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={item => item.id.toString()}
          maxToRenderPerBatch={3}
          initialNumToRender={3}
          contentContainerStyle={tw`flex-1 pb-8`}
          ListEmptyComponent={
            <View style={tw`flex-1 justify-center items-center`}>
              <Text style={tw`text-slate-700 text-lg`}>{t('noSections')}</Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default TopicDetails;
