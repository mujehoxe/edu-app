import React from 'react';
import {View, FlatList} from 'react-native';
import tw from 'twrnc';
import {Block} from '../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import BlockCard from '../components/BlockCard';
import ErrorComponent from '../components/ErrorComponent';
import {RouteProp} from '@react-navigation/native';

type UnitDetailsRouteProp = RouteProp<RootStackParamList, 'UnitDetails'>;

interface UnitDetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'UnitDetails'> {
  route: UnitDetailsRouteProp;
}

const UnitDetails: React.FC<UnitDetailsProps> = ({route}) => {
  const {unit} = route.params;

  if (!unit) {
    return <ErrorComponent message="Unit Not Found" />;
  }

  const renderBlock = ({item}: {item: Block}) => (
    <View style={tw`px-4 py-3`}>
      <BlockCard block={item} />
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={unit.blocks}
        renderItem={renderBlock}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={tw`pb-8`}
      />
    </View>
  );
};

export default UnitDetails;
