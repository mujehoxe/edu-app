import React, {useEffect, useState} from 'react';
import tw from '../../tailwind';
import {Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useTranslation} from 'react-i18next';
import {SignalIcon, SignalSlashIcon} from 'react-native-heroicons/outline';

const ConnectivityIndicator: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);

  const {t} = useTranslation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isInternetReachable);
      if (state.isInternetReachable) {
        setTimeout(() => {
          setIsShown(false);
        }, 3000);
      } else {
        setIsShown(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View
      style={tw`flex-row gap-4 justify-center items-center 
        ${isShown ? 'h-8' : 'h-0'}
        ${isConnected ? 'bg-green-700' : 'bg-slate-900'}`}>
      <Text style={tw`text-white`}>
        {isConnected ? t('connectionRestored') : t('noConnection')}
      </Text>
      {isConnected ? (
        isShown && <SignalIcon color={'white'} />
      ) : (
        <SignalSlashIcon color={'white'} />
      )}
    </View>
  );
};

export default ConnectivityIndicator;
