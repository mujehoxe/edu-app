import React from 'react';
import {useEffect, useState} from 'react';
import {SectionCardProps} from '../types';
import tw from '../../tailwind';
import Markdown, {MarkdownIt} from '@ronradtke/react-native-markdown-display';
import {Text, View} from 'react-native';
import katexPlugin from '@ryanxcharles/markdown-it-katex';
import MathView from 'react-native-math-view';

const markdownItInstance = MarkdownIt({typographer: true}).use(katexPlugin, {
  containerClassName: 'math',
});

const MarkdownSectionCard: React.FC<SectionCardProps> = ({section}) => {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);

  useEffect(() => {
    if (section.contentType === 'markdown' && markdownContent === null) {
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
        'Error fetching remote Markdown content: ' + error.message,
      );
    }
  };

  return (
    <View style={tw`bg-slate-100 shadow-md rounded-md mb-4 p-4`}>
      {markdownContent !== null ? (
        <Markdown
          style={markdownStyles}
          markdownit={markdownItInstance}
          rules={{
            // eslint-disable-next-line react/no-unstable-nested-components
            math_block: (node, children, parent, styles) => (
              <View key={node.key}>
                <MathView math={node.content} style={styles.math_block} />
              </View>
            ),
            // eslint-disable-next-line react/no-unstable-nested-components
            math_inline: (node, children, parent, styles) => (
              <View key={node.key}>
                <MathView math={node.content} style={styles.math_inline} />
              </View>
            ),
          }}>
          {markdownContent}
        </Markdown>
      ) : (
        <Text style={tw`text-slate-900`}>Loading Markdown content...</Text>
      )}
    </View>
  );
};

export default MarkdownSectionCard;

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
  math_inline: tw`text-slate-900 text-base -mb-3`,
  math_block: tw`text-slate-900 text-base my-2`,
  hr: tw`border-t border-gray-300 my-4`, // Add a horizontal line with gray color
};
