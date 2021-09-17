import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import SnowSvg from '../assets/images/snow.svg';
import BeachSvg from '../assets/images/beach.svg';
import ForestSvg from '../assets/images/forest.svg';

const CategorySelector = () => {
  return (
    <ScrollView
      horizontal
      decelerationRate="fast"
      snapToOffsets={[0, 285]}
      snapToAlignment="center"
      style={tw`w-full`}>
      <Card style={s.snapWidth}>
        <Card.Content style={tw`bg-blue-100`}>
          <Title style={tw`text-center`}>Niege</Title>
          <SnowSvg height={200} width={270} />
        </Card.Content>
      </Card>
      <Card style={s.snapWidth}>
        <Card.Content style={tw`bg-blue-300`}>
          <Title style={tw`text-center`}>Plage</Title>
          <BeachSvg height={200} width={300} />
        </Card.Content>
      </Card>
      <Card style={s.snapWidth}>
        <Card.Content style={tw`bg-yellow-800`}>
          <Title style={tw`text-center`}>Foret</Title>
          <ForestSvg height={200} width={270} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  snapWidth: {
    width: 310,
  },
});

export default CategorySelector;
