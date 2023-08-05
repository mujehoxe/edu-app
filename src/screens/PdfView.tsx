import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import tw from 'twrnc';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {SafeAreaView} from 'react-native-safe-area-context';
import RNPrint from 'react-native-print';
import {useNavigation} from '@react-navigation/native';
import {PrinterIcon} from 'react-native-heroicons/outline';
import useImmersiveLandscape from '../hooks/useImmersiveLandscape';

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
  const {src} = route.params;
  const [pdfWidth, setPdfWidth] = useState(Dimensions.get('window').width);
  const navigation = useNavigation<PdfViewScreenNavigationProp>();

  navigation.setOptions({
    headerRight: () => (
      <PrinterIcon style={tw`text-black`} onPress={printPDF} />
    ),
    headerTransparent: true,
  });

  const printPDF = async () => {
    await RNPrint.print({filePath: src});
  };

  useImmersiveLandscape();

  useEffect(() => {
    const updatePdfWidth = () => {
      setPdfWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updatePdfWidth);
  }, [navigation, src]);

  return (
    <SafeAreaView style={tw`bg-slate-200 flex-1 w-full h-full bg-transparent`}>
      <Pdf
        source={{uri: src}}
        trustAllCerts={false}
        fitPolicy={0}
        style={[tw`flex-1`, {width: pdfWidth, height: '100%'}]}
      />
    </SafeAreaView>
  );
};

export default PdfView;
