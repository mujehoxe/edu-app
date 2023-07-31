import React from 'react';
import {View, FlatList} from 'react-native';
import tw from 'twrnc';
import {Topic} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import TopicCard from '../components/TopicCard';
import ErrorComponent from '../components/ErrorComponent';
import {RouteProp} from '@react-navigation/native';

type UnitDetailsRouteProp = RouteProp<RootStackParamList, 'UnitDetails'>;

interface UnitDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'UnitDetails'> {
  route: UnitDetailsRouteProp;
}

const UnitDetails: React.FC<UnitDetailsProps> = ({route, navigation}) => {
  const {unit} = route.params;

  if (!unit) {
    return <ErrorComponent message="Unit Not Found" />;
  }

  const renderTopic = ({item}: {item: Topic}) => (
    <View style={tw`px-4 py-3`}>
      <TopicCard
        topic={item}
        onPress={() => navigation.navigate('TopicDetails', {topic: item})}
      />
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={unit.topics}
        renderItem={renderTopic}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={tw`pb-8`}
      />
    </View>
  );
};

export default UnitDetails;
