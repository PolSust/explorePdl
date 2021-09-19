import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text, TouchableRipple } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import uuid from 'react-native-uuid';

const DepartmentAutocomplete = ({ inputQuery }) => {
  const [departments, setDepartments] = useState([{ nom: '' }]);
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

      setDepartments(filteredDepartments);
      console.log(filteredDepartments);
    };
    fetchDepartments();
  }, [query]);

  const AutoCompleteItem = ({ item }) => (
    <TouchableRipple
      onPress={() => {
        return;
      }}
      rippleColor="#8a8a8a"
      style={tw`pt-4 pl-3`}>
      <Text style={s.item}>{item.nom}</Text>
    </TouchableRipple>
  );

  return (
    <FlatList
      style={tw`bg-gray-200`}
      data={departments}
      renderItem={AutoCompleteItem}
      keyExtractor={() => uuid.v4().toString()}
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

export default DepartmentAutocomplete;
