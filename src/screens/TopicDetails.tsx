import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import tw from '../../tailwind';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AssignmentSection, RootStackParamList, Section} from '../types';
import SectionCard from '../components/SectionCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {VideoSection} from '../components/VideoSectionCard';
import firestore from '@react-native-firebase/firestore';
import {LoadingIndicator} from '../components/LoadingIndicator';
import EmptyList from '../components/EmpltyList';

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

  const {topic} = route.params;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Sections')
      .where('topicId', '==', topic.id)
      .orderBy('order')
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

  const [sections, setSections] = useState<
    (Section | VideoSection | AssignmentSection)[]
  >([]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: tw`bg-primary`,
      headerTitleStyle: tw`text-white`,
      headerTintColor: 'white',
    });
  }, [navigation]);

  const [currentPlayingVideoIndex, setCurrentVideoIndex] = useState(-1);

  const handleVideoPlayPause = (index: number) => {
    setCurrentVideoIndex(prevIndex => {
      if (prevIndex === index) {
        return -1; // Stop the current video if tapped again
      } else {
        return index; // Set the index of the new video to play
      }
    });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={tw`flex-1 bg-white dark:bg-black`}>
      <StatusBar backgroundColor="#2196F3" barStyle={'light-content'} />
      <SafeAreaView style={tw`flex-1`}>
        <ScrollView style={tw`flex-1 pt-4`} scrollEventThrottle={16}>
          {sections.length === 0 ? (
            <EmptyList message={t('noSections')} />
          ) : (
            sections?.map((item, index) => (
              <SectionCard
                key={item.id}
                section={item}
                isPlaying={
                  item.contentType === 'video' &&
                  index === currentPlayingVideoIndex
                }
                onPlayPause={
                  item.contentType === 'video'
                    ? () => handleVideoPlayPause(index)
                    : undefined
                }
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TopicDetails;
