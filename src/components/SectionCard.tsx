import React from 'react';
import {AssignmentSection, SectionCardProps} from '../types';
import {contentRenderers} from './SectionContentTypeRenderers';
import ErrorComponent from './ErrorComponent';
import {Text, View} from 'react-native';
import tw from 'twrnc';

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  isPlaying,
  onPress,
}) => {
  const ContentComponent = contentRenderers[section.contentType];

  if (!ContentComponent) {
    return <ErrorComponent message="Unsupported Content Type" />;
  }

  const assignmentSection = section as AssignmentSection;

  return (
    <View style={tw`bg-white shadow-md rounded-md`}>
      <View style={tw`bg-gray-100 p-4 border-b border-gray-300 rounded-t-md`}>
        <Text style={tw`text-lg font-semibold text-slate-900`}>
          {section.title}
        </Text>
      </View>
      <ContentComponent
        section={section}
        isPlaying={isPlaying}
        onPress={onPress}
      />
      {assignmentSection.deadline && (
        <View style={tw`p-4 bg-red-100 border-t border-gray-300 rounded-b-md`}>
          <Text style={tw`text-right text-red-600 text-base font-semibold`}>
            Deadline: {assignmentSection.deadline.toDateString()}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SectionCard;
