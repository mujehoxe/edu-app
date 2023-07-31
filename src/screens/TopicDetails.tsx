import React, {useState} from 'react';
import {View, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import tw from 'twrnc';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AssignmentSection,
  RootStackParamList,
  Section,
  VideoSection,
} from '../types';
import ErrorComponent from '../components/ErrorComponent';
import SectionCard from '../components/SectionCard';

const sections: Section[] | VideoSection[] | AssignmentSection[] = [
  {
    id: 1,
    title: 'درس',
    src: 'https://vjs.zencdn.net/v/oceans.mp4',
    contentType: 'video',
    thumbnailSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPT0JDPj5ZO-PV_w8-AnufjkUlj1Xp0WeEXA&usqp=CAU',
  },
  {
    id: 2,
    title: 'شكل 1',
    src: 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg',
    contentType: 'svg',
  },
  {
    id: 3,
    title: 'حل تمرين',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    contentType: 'video',
    thumbnailSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPT0JDPj5ZO-PV_w8-AnufjkUlj1Xp0WeEXA&usqp=CAU',
  },
  {
    id: 4,
    title: 'شكل 2',
    src: 'https://i0.wp.com/blog.filestack.com/wp-content/uploads/2019/03/image-file-extensions.png',
    contentType: 'image',
  },
  {
    id: 5,
    title: 'واجب',
    src: 'https://www.africau.edu/images/default/sample.pdf',
    contentType: 'pdf',
    type: 'assignment',
    deadline: new Date('2023-07-29'),
  },
  {
    id: 6,
    title: 'قوانين',
    src: 'https://gist.githubusercontent.com/rt2zz/e0a1d6ab2682d2c47746950b84c0b6ee/raw/83b8b4814c3417111b9b9bef86a552608506603e/markdown-sample.md',
    contentType: 'markdown',
  },
];

type TopicDetailsRouteProp = RouteProp<RootStackParamList, 'TopicDetails'>;

interface TopicDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'TopicDetails'> {
  route: TopicDetailsRouteProp;
}

const TopicDetails: React.FC<TopicDetailsProps> = ({route}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);

  const handleVideoTap = (index: number) => {
    setCurrentVideoIndex(prevIndex => {
      if (prevIndex === index) {
        return -1; // Stop the current video if tapped again
      } else {
        return index; // Set the index of the new video to play
      }
    });
  };

  const {topic} = route.params;

  if (!topic) {
    return <ErrorComponent message="Topic Not Found" />;
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <SafeAreaView style={tw`flex-1`}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ScrollView style={tw`flex-1 mx-5`} scrollEventThrottle={16}>
          {sections?.map((item, index) => (
            <View key={item.id} style={tw`mb-4`}>
              <SectionCard
                section={item}
                isPlaying={
                  item.contentType === 'video' && index === currentVideoIndex
                }
                onPress={
                  item.contentType === 'video'
                    ? () => handleVideoTap(index)
                    : undefined
                }
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TopicDetails;
