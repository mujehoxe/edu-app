import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import tw from 'twrnc';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import ErrorComponent from '../components/ErrorComponent';
import SectionCard from '../components/SectionCard';

type TopicDetailsRouteProp = RouteProp<RootStackParamList, 'TopicDetails'>;

interface TopicDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'TopicDetails'> {
  route: TopicDetailsRouteProp;
}

const sections = [
  {
    id: 1,
    title: 's1',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 2,
    title: 's1',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 3,
    title: 's1',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 4,
    title: 's1',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
];

const TopicDetails: React.FC<TopicDetailsProps> = ({route}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);

  const handleVideoTap = (index: number) => {
    setCurrentVideoIndex(index);
  };

  const {topic} = route.params;

  if (!topic) {
    return <ErrorComponent message="Topic Not Found" />;
  }

  return (
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      <SafeAreaView
        style={[tw`flex-1 w-full`, {paddingTop: StatusBar.currentHeight}]}>
        <ScrollView style={tw`flex-1 mx-5`} scrollEventThrottle={16}>
          {sections?.map((item, index) => (
            <SectionCard
              key={item.id}
              section={item}
              isPlaying={index === currentVideoIndex}
              onPress={() => handleVideoTap(index)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TopicDetails;
