import React, {useState} from 'react';
import {View, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import tw from 'twrnc';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Section} from '../types';
import ErrorComponent from '../components/ErrorComponent';
import SectionCard from '../components/SectionCard';

type TopicDetailsRouteProp = RouteProp<RootStackParamList, 'TopicDetails'>;

interface TopicDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'TopicDetails'> {
  route: TopicDetailsRouteProp;
}

const sections: Section[] = [
  {
    id: 1,
    title: 's1',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    contentType: 'video',
  },
  {
    id: 2,
    title: 's1',
    src: 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg',
    contentType: 'svg',
  },
  {
    id: 3,
    title: 's1',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    contentType: 'video',
  },
  {
    id: 4,
    title: 's1',
    src: 'https://i0.wp.com/blog.filestack.com/wp-content/uploads/2019/03/image-file-extensions.png',
    contentType: 'image',
  },
  {
    id: 5,
    title: 's1',
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    contentType: 'pdf',
  },
  {
    id: 6,
    title: 's1',
    src: 'https://gist.githubusercontent.com/rt2zz/e0a1d6ab2682d2c47746950b84c0b6ee/raw/83b8b4814c3417111b9b9bef86a552608506603e/markdown-sample.md',
    contentType: 'markdown',
  },
];

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
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      <SafeAreaView
        style={[tw`flex-1 w-full`, {paddingTop: StatusBar.currentHeight}]}>
        <ScrollView style={tw`flex-1 mx-5`} scrollEventThrottle={16}>
          {sections?.map((item, index) => (
            <SectionCard
              key={item.id}
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
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TopicDetails;
