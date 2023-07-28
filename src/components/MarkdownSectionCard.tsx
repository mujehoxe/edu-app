import React from 'react';
import {useEffect, useState} from 'react';
import {SectionCardProps} from '../types';
import tw from 'twrnc';
import Markdown from '@ronradtke/react-native-markdown-display';

export const MarkdownSectionCard: React.FC<SectionCardProps> = ({section}) => {
  const [markdownContent, setMarkdownContent] = useState(String);

  useEffect(() => {
    if (section.contentType === 'markdown' && !markdownContent) {
      fetchRemoteMarkdownContent(section.src)
        .then(content => setMarkdownContent(content))
        .catch(error => setMarkdownContent(error));
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
      throw new Error('Error fetching remote Markdown content:' + error);
    }
  };

  const markdownStyles = {
    text: tw`text-slate-950 text-lg`,
  };
  return <Markdown style={markdownStyles}>{markdownContent}</Markdown>;
};
