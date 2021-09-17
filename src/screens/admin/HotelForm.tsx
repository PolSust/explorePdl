import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { TextInput, Card, Paragraph, Title } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import CategorySelector from '../../components/CategorySelector';
import StarPicker from '../../components/StarPicker';
import Hotel from '../../interfaces/Hotel';

const HotelForm = (hotelInput: Hotel) => {
  const [hotel, setHotel] = useState(hotelInput);

  useEffect(() => {
    console.log(hotel);
  }, [hotel]);

  return (
    <ScrollView>
      <View style={tw`w-full h-full `}>
        <TextInput
          style={tw`my-5`}
          label="Nom"
          autoCompleteType="off"
          value={hotel.name}
          onChangeText={name => setHotel({ name })}
        />
        <View style={tw`flex flex-row justify-center`}>
          <StarPicker inputRating={hotel.stars} />
        </View>
        <View style={tw`w-full`}>
          <Title style={tw`text-center`}>Categorie</Title>
          <CategorySelector />
        </View>
        <TextInput
          style={tw`my-5`}
          label="Département"
          autoCompleteType="off"
          value={hotel.department}
        />
        <TextInput
          style={tw`my-5`}
          label="Ville"
          autoCompleteType="off"
          value={hotel.city}
        />
      </View>
    </ScrollView>
  );
};

export default HotelForm;
