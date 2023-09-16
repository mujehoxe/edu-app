import React, {useEffect, useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import tw from '../../tailwind';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {SafeAreaView} from 'react-native-safe-area-context';
import RNPrint from 'react-native-print';
import {PrinterIcon} from 'react-native-heroicons/solid';
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

const PdfView: React.FC<PdfViewProps> = ({route, navigation}) => {
  const {src} = route.params;
  const [pdfWidth, setPdfWidth] = useState(Dimensions.get('window').width);
  const [isHeaderShown, setIsHeaderShown] = useState<boolean>(true);

  const PrinerIcon = useMemo(() => {
    const printPDF = async () => {
      await RNPrint.print({filePath: src});
    };
    return (
      <PrinterIcon
        style={tw`text-slate-100`}
        stroke={tw.color('black')}
        onPress={printPDF}
      />
    );
  }, [src]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => PrinerIcon,
      headerTransparent: true,
      headerShown: isHeaderShown,
      headerTintColor: tw.color('gray-400'),
    });
  }, [navigation, PrinerIcon, isHeaderShown]);

  useImmersiveLandscape();

  useEffect(() => {
    const updatePdfWidth = () => {
      setPdfWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updatePdfWidth);
  }, []);

  return (
    <SafeAreaView style={tw`bg-slate-200 flex-1 w-full h-full bg-transparent`}>
      <Pdf
        source={{uri: src}}
        trustAllCerts={false}
        fitPolicy={0}
        onPageSingleTap={() => setIsHeaderShown(!isHeaderShown)}
        style={[tw`flex-1`, {width: pdfWidth, height: '100%'}]}
      />
    </SafeAreaView>
  );
};

export default PdfView;
