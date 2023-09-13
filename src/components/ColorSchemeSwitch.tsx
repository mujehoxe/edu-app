import React from 'react';
import {Appearance, TouchableOpacity} from 'react-native';
import {MoonIcon, SunIcon} from 'react-native-heroicons/solid';
import tw from '../../tailwind';
import {useDeviceContext} from 'twrnc';

export const ColorSchemeSwitch = () => {
  const toggleColorScheme = () => {
    Appearance.getColorScheme() === 'light'
      ? Appearance.setColorScheme('dark')
      : Appearance.setColorScheme('light');
  };

  useDeviceContext(tw);

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      style={tw`p-2 rounded-full bg-gray-100 dark:bg-slate-700`}>
      {Appearance.getColorScheme() === 'light' ? (
        <MoonIcon style={tw`text-slate-900`} />
      ) : (
        <SunIcon style={tw`text-slate-100`} />
      )}
    </TouchableOpacity>
  );
};
