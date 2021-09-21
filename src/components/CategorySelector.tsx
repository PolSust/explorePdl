import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import SnowSvg from '../assets/images/snow.svg';
import BeachSvg from '../assets/images/beach.svg';
import ForestSvg from '../assets/images/forest.svg';

interface Props {
  defaultCategory: number | undefined;
  callback: (category: number) => void;
}

const CategorySelector = ({ defaultCategory, callback }: Props) => {
  const [snowSelected, setSnowSelected] = useState(false); //1
  const [beachSelected, setBeachSelected] = useState(false); //2
  const [forestSelected, setForestSelected] = useState(false); //3

  useEffect(() => {
    if (snowSelected) {
      callback(1);
    } else if (beachSelected) {
      callback(2);
    } else if (forestSelected) {
      callback(3);
    }
  }, [snowSelected, beachSelected, forestSelected]);

  useEffect(() => {
    if (defaultCategory == 1) {
      setSnowSelected(true);
    } else if (defaultCategory == 2) {
      setBeachSelected(true);
    } else if (defaultCategory == 3) {
      setForestSelected(true);
    }
  }, []);

  if (snowSelected) {
    return (
      <View
        style={tw`w-full`}
        onTouchEnd={() => {
          setSnowSelected(false);
        }}>
        <Card.Content style={tw`bg-blue-100`}>
          <Title style={tw`text-center`}>Niege</Title>
          <SnowSvg height={200} width={335} />
        </Card.Content>
      </View>
    );
  } else if (beachSelected) {
    return (
      <View
        style={tw`w-full`}
        onTouchEnd={() => {
          setBeachSelected(false);
        }}>
        <Card.Content style={tw`bg-blue-300`}>
          <Title style={tw`text-center`}>Plage</Title>
          <BeachSvg height={200} width={360} />
        </Card.Content>
      </View>
    );
  } else if (forestSelected) {
    return (
      <View
        style={tw`w-full`}
        onTouchEnd={() => {
          setForestSelected(false);
        }}>
        <Card.Content style={tw`bg-yellow-800`}>
          <Title style={tw`text-center`}>Foret</Title>
          <ForestSvg height={200} width={320} />
        </Card.Content>
      </View>
    );
  } else {
    return (
      <ScrollView
        horizontal
        decelerationRate="fast"
        snapToOffsets={[-10, 285]}
        snapToAlignment="center"
        style={tw`w-full`}>
        <Card
          style={s.snapWidth}
          onTouchEnd={() => {
            setSnowSelected(true);
          }}>
          <Card.Content style={tw`bg-blue-100`}>
            <Title style={tw`text-center`}>Niege</Title>
            <SnowSvg height={200} width={270} />
          </Card.Content>
        </Card>

        <Card
          style={s.snapWidth}
          onTouchEnd={() => {
            setBeachSelected(true);
          }}>
          <Card.Content style={tw`bg-blue-300`}>
            <Title style={tw`text-center`}>Plage</Title>
            <BeachSvg height={200} width={300} />
          </Card.Content>
        </Card>

        <Card
          style={s.snapWidth}
          onTouchEnd={() => {
            setForestSelected(true);
          }}>
          <Card.Content style={tw`bg-yellow-800`}>
            <Title style={tw`text-center`}>Foret</Title>
            <ForestSvg height={200} width={270} />
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }
};

const s = StyleSheet.create({
  snapWidth: {
    width: 310,
  },
});

export default CategorySelector;
