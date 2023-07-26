import React from 'react';
import {View} from 'react-native';
import Pdf from 'react-native-pdf';
import tw from 'twrnc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type PdfViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PdfView'
>;

type PdfViewRouteProp = RouteProp<RootStackParamList, 'PdfView'>;

interface PdfViewProps
  extends NativeStackScreenProps<RootStackParamList, 'PdfView'> {
  route: PdfViewRouteProp;
}

const PdfView: React.FC<PdfViewProps> = ({route}) => {
  const {src} = route.params.section;

  return (
    <View style={tw`bg-black flex-1 justify-start items-center mt-2`}>
      <Pdf
        source={{uri: src}}
        trustAllCerts={false}
        style={[tw`flex-1`, {width: wp('100%'), height: hp('100%')}]}
      />
    </View>
  );
};

export default PdfView;
