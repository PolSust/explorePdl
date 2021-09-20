import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import AutocompletionProps from '../interfaces/AutocompletionProps';
import AutocompletionBase from './AutocompletionBase';

const DepartmentAutocompletion: FC<AutocompletionProps> = ({
  inputQuery,
  onAutocompletionItemPress,
}) => {
  const [departments, setDepartments] = useState([{}]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (inputQuery == undefined) inputQuery = '';
    setQuery(inputQuery);
  }, [inputQuery]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await axios.get(
        'https://geo.api.gouv.fr/regions/52/departements',
      );

      let filteredDepartments = response.data.filter((dep: any) =>
        dep.nom.toLowerCase().trim().includes(query.toLowerCase().trim()),
      );

      if (query.length == 0) filteredDepartments = [];
      console.log(filteredDepartments);

      setDepartments(filteredDepartments);
    };
    fetchDepartments();
  }, [query]);

  const AutocompletionItem = (
    { item }: any,
    onPress: AutocompletionProps['onAutocompletionItemPress'],
  ) => (
    <TouchableRipple
      onPress={() => {
        onPress(item.nom, item.code);
      }}
      rippleColor="#8a8a8a"
      style={tw`pt-4 pl-3`}>
      <Text style={s.item}>{item.nom}</Text>
    </TouchableRipple>
  );

  return (
    <AutocompletionBase
      data={departments}
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

export default DepartmentAutocompletion;
