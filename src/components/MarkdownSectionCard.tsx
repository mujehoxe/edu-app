import React from 'react';
import {useEffect, useState} from 'react';
import {SectionCardProps} from '../types';
import tw from 'twrnc';
import Markdown from '@ronradtke/react-native-markdown-display';
import {Text, View} from 'react-native';

const MarkdownSectionCard: React.FC<SectionCardProps> = ({section}) => {
  const [markdownContent, setMarkdownContent] = useState(String);

  useEffect(() => {
    if (section.contentType === 'markdown' && !markdownContent) {
      fetchRemoteMarkdownContent(section.src)
        .then(content => setMarkdownContent(content))
        .catch(error => setMarkdownContent(error.message));
    }
  }, [section, markdownContent]);

  const fetchRemoteMarkdownContent = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.text();
    } catch (error) {
      throw new Error(
        'Error fetching remote Markdown content:' + error.message,
      );
    }
  };

  const markdownStyles = {
    text: tw`text-slate-900 text-base`, // Adjust font size and color for better readability
    strong: tw`font-semibold`,
    em: tw`italic`,
    heading1: tw`text-2xl font-bold mt-2 mb-1`,
    heading2: tw`text-xl font-bold mt-2 mb-1`,
    heading3: tw`text-lg font-bold mt-2 mb-1`,
    heading4: tw`text-base font-bold mt-2 mb-1`,
    heading5: tw`text-base font-bold mt-2 mb-1`,
    heading6: tw`text-base font-bold mt-2 mb-1`,
    list_unordered_item: tw`pl-6`, // Indent unordered list items
    list_ordered_item: tw`pl-6`, // Indent ordered list items
    list_unordered: tw`pl-8`, // Add extra padding to the left of unordered lists
    list_ordered: tw`pl-8`, // Add extra padding to the left of ordered lists
    link: tw`text-blue-500 underline`, // Style links with blue color and underline
    blockquote: tw`border-l-4 border-blue-500 pl-4 italic my-4`, // Add a border to blockquotes and style it
    code_block: tw`text-slate-900 text-base`,
    code_inline: tw`text-slate-900 text-base`,
    hr: tw`border-t border-gray-300 my-4`, // Add a horizontal line with gray color
  };

  return (
    <View style={tw`bg-slate-100 shadow-md rounded-md mb-4 p-4`}>
      {markdownContent !== null ? (
        <Markdown style={markdownStyles}>{markdownContent}</Markdown>
      ) : (
        <Text style={tw`text-slate-900`}>Loading Markdown content...</Text>
      )}
    </View>
  );
};

export default MarkdownSectionCard;
