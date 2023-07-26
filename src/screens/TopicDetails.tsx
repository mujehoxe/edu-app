import React from 'react';
import {View, Text} from 'react-native';
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
      <Text style={tw`text-2xl font-bold text-slate-900`}>{topic.name}</Text>
    </View>
  );
};

export default TopicDetails;
