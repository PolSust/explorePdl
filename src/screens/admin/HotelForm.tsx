import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import CategorySelector from '../../components/CategorySelector';
import DepartmentAutocomplete from '../../components/DepartmentAutocomplete';
import StarPicker from '../../components/StarPicker';
import Hotel from '../../interfaces/Hotel';

const HotelForm = (hotelInput: Hotel) => {
  const [hotel, setHotel] = useState(hotelInput);
  const [departmentFilled, setDepartmentFilled] = useState<boolean>(false);

  useEffect(() => {
    console.log(hotel.department);
  }, [hotel]);

  return (
    <ScrollView>
      <View style={tw`w-full h-full`}>
        <TextInput
          style={tw`m-5`}
          label="Nom"
          autoCompleteType="off"
          value={hotel.name}
          onChangeText={(name) => setHotel({ ...hotel, name })}
        />
        <View style={tw`flex flex-row justify-center`}>
          <StarPicker inputRating={hotel.stars} />
        </View>
        <View style={tw`w-full`}>
          <Title style={tw`text-center`}>Categorie</Title>
          <CategorySelector />
        </View>
        <View style={tw`m-5 `}>
          <TextInput
            label="Département"
            autoCompleteType="off"
            value={hotel.department}
            onChangeText={(department) => setHotel({ ...hotel, department })}
            onBlur={() => {
              if (hotel.department) setDepartmentFilled(true);
            }}
          />
          <DepartmentAutocomplete inputQuery={hotel.department} />
        </View>
        {departmentFilled && (
          <TextInput
            style={tw`m-5`}
            label="Ville"
            autoCompleteType="off"
            value={hotel.city}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default HotelForm;
