import React from 'react';
import {Appearance, TouchableOpacity} from 'react-native';
import {MoonIcon, SunIcon} from 'react-native-heroicons/solid';
import tw from '../../tailwind';

export const ColorSchemeSwitch = () => {
  const colorScheme = Appearance.getColorScheme();

  const toggleColorScheme = () => {
    colorScheme === 'light'
      ? Appearance.setColorScheme('dark')
      : Appearance.setColorScheme('light');
  };

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      style={tw`bg-opacity-15 p-2 rounded-full bg-black dark:bg-white`}>
      {colorScheme === 'light' ? (
        <MoonIcon style={tw`text-slate-900`} />
      ) : (
        <SunIcon style={tw`text-slate-100`} />
      )}
    </TouchableOpacity>
  );
};
