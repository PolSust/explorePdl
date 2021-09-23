import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar, Text, TouchableRipple } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import Hotel from '../interfaces/Hotel';
import AutocompletionBase from './AutocompletionBase';

interface Props {
  inputStyle?: any;
  /**
   * The value of the input
   */
  defaultValue?: string;
  /**
   * sends an array of Hotels when an autocompletion item is pressed
   */
  itemSelectCallback: (hotels: Hotel[], query: string) => void;
  queryEmptyCallback?: () => void;
}

const SearchHotels = ({
  inputStyle = tw`text-lg`,
  defaultValue = '',
  itemSelectCallback,
  queryEmptyCallback,
}: Props) => {
  const [query, setQuery] = useState(defaultValue);
  const [results, setResults] = useState<string[]>([]);
  const [displayAutocompletion, setDisplayAutocompletion] =
    useState<boolean>(false);

  useEffect(() => {
    if (!query && queryEmptyCallback) {
      queryEmptyCallback();
    }
  }, [query]);

  // useEffect(() => {
  //   setQuery(defaultValue);
  // }, [defaultValue]);

  const onQueryChange = async (text: string) => {
    setQuery(text);

    let result = await axios.post(
      'https://cefii-developpements.fr/pol1149/explorePdlServer/index.php',
      { search: text },
      {
        params: {
          entity: 'hotel',
          action: 'search',
        },
      },
    );

    setResults(result.data);
    console.log(results);
  };

  const AutocompletionItem = ({ item }: any) => (
    <TouchableRipple
      onPress={() => {
        setQuery(item);
        setDisplayAutocompletion(false);
        getHotels(item);
      }}
      rippleColor="#8a8a8a"
      style={tw`pt-4 pl-3`}>
      <Text style={s.item}>{item}</Text>
    </TouchableRipple>
  );

  const getHotels = async (query: string) => {
    let result = await axios.post(
      'https://cefii-developpements.fr/pol1149/explorePdlServer/index.php',
      { search: query },
      {
        params: {
          entity: 'hotel',
          action: 'getBySearch',
        },
      },
    );

    itemSelectCallback(result.data, query);
  };

  return (
    <>
      <Searchbar
        placeholder={'Département, ville...'}
        value={query}
        onChangeText={onQueryChange}
        onTouchStart={() => setDisplayAutocompletion(true)}
        inputStyle={inputStyle}
      />

      {displayAutocompletion && (
        <AutocompletionBase
          relative1
          bgColor="bg-white"
          data={results}
          renderItem={(item) => AutocompletionItem(item)}
        />
      )}
    </>
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

export default SearchHotels;
