import axios from 'axios';
import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

const SearchHotels = ({style = tw`rounded-full`, inputStyle = tw`text-lg`}) => {
  const [query, setQuery] = useState('');

  const onQueryChange = async (text: string) => {
    setQuery(text);

    let departements = await axios.get(
      'https://geo.api.gouv.fr/regions/52/departements',
    );
    let villes = await axios.get('https://geo.api.gouv.fr/communes', {
      params: {
        codeRegion: 52,
        nom: query,
      },
    });

    console.log(villes.data);
  };

  return (
    <Searchbar
      placeholder={'Département, ville...'}
      value={query}
      onChangeText={onQueryChange}
      style={style}
      inputStyle={inputStyle}
    />
  );
};

export default SearchHotels;
