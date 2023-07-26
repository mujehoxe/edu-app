import React from 'react';
import {View, Text, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import tw from 'twrnc';
import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import Error from '../components/ErrorComponent';

type TopicDetailsRouteProp = RouteProp<RootStackParamList, 'TopicDetails'>;

interface TopicDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'TopicDetails'> {
  route: TopicDetailsRouteProp;
}

const TopicDetails: React.FC<TopicDetailsProps> = ({route}) => {
  const {topic} = route.params;

  if (!topic) {
    return <Error message="Topic Not Found" />;
  }

  return (
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      <SafeAreaView
        style={[tw`flex-1 w-full`, {paddingTop: StatusBar.currentHeight}]}>
        <ScrollView style={tw`mx-5`}>
          {topic.sections.map((item, index) => {
            console.log(item);
            return (
              <View key={index} style={tw`w-fit`}>
                <Text style={tw`text-3xl`}>{item.title}</Text>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TopicDetails;
