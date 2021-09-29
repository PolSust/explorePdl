import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import AutocompletionProps from '../interfaces/AutocompletionProps';
import AutocompletionBase from './AutocompletionBase';

const CityAutocompletion: FC<AutocompletionProps> = ({
  inputQuery,
  onAutocompletionItemPress,
  codeDepartment,
}) => {
  const [villes, setVilles] = useState([{}]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (inputQuery == undefined) inputQuery = '';
    setQuery(inputQuery);
  }, [inputQuery]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await axios.get('https://geo.api.gouv.fr/communes', {
        params: {
          limit: '10',
          codeDepartement: codeDepartment,
          nom: query,
        },
      });

      //sort by population
      response.data.sort(
        (a: { population: number }, b: { population: number }) =>
          b.population - a.population,
      );

      // console.log(response.data);
      // console.log(codeDepartment);

      setVilles(response.data);
    };
    fetchDepartments();
  }, [query]);

  const AutocompletionItem = (
    { item }: any,
    onPress: AutocompletionProps['onAutocompletionItemPress'],
  ) => (
    <TouchableRipple
      onPress={() => {
        onPress(item.nom);
      }}
      rippleColor="#8a8a8a"
      style={tw`pt-4 pl-3`}>
      <Text style={s.item}>{item.nom}</Text>
    </TouchableRipple>
  );

  return (
    <AutocompletionBase
      bgColor="bg-gray-200"
      data={villes}
      renderItem={(item) => AutocompletionItem(item, onAutocompletionItemPress)}
    />
  );
};

const s = StyleSheet.create({
  item: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontSize: 18,
    paddingBottom: 7,
  },
});

export default CityAutocompletion;
