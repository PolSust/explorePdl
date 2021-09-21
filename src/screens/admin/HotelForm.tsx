import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import CategorySelector from '../../components/CategorySelector';
import CityAutocompletion from '../../components/CityAutocompletion';
import DepartmentAutocompletion from '../../components/DepartmentAutocompletion';
import StarPicker from '../../components/StarPicker';
import Hotel from '../../interfaces/Hotel';
import ImageChoiceModal from '../../components/ImageChoiceModal';

const HotelForm = (routes, hotelInput: Hotel) => {
  // If the id is undefined it means we are creating a new hotel
  if (!hotelInput.id) {
    hotelInput = createNullHotel();
  }
  const [hotel, setHotel] = useState<Hotel>(hotelInput);
  const [departmentFilled, setDepartmentFilled] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);

  const [showdepAutocompletion, setShowdepAutocompletion] =
    useState<boolean>(false);

  const [showvilleAutocompletion, setshowvilleAutocompletion] =
    useState<boolean>(false);

  const [codeDepartment, setCodeDepartment] = useState<number | string>();

  useEffect(() => {
    let isFormValid = true;

    for (const key in hotel) {
      if ((hotel[key] == null || hotel[key] == '') && key != 'id') {
        isFormValid = false;
      }
    }
    setFormValid(isFormValid);
    console.log(hotel);
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
          <StarPicker
            inputRating={hotel.stars}
            disabled={false}
            callback={(rating) => {
              setHotel({ ...hotel, stars: rating });
            }}
          />
        </View>

        <TextInput
          style={tw`m-5`}
          multiline
          numberOfLines={7}
          label="Description"
          autoCompleteType="off"
          value={hotel.description}
          onChangeText={(description) => setHotel({ ...hotel, description })}
        />

        <View style={tw`w-full`}>
          <Title style={tw`text-center`}>Categorie</Title>
          <CategorySelector
            defaultCategory={hotel.category}
            callback={(categoryNum: number) => {
              setHotel({ ...hotel, category: categoryNum });
            }}
          />
        </View>

        <ImageChoiceModal
          callback={(image64: string) => {
            setHotel({ ...hotel, picture: image64 });
          }}
        />
        {hotel.picture && (
          <View style={tw`flex items-center mt-3`}>
            <Image
              style={tw`w-60 h-40`}
              resizeMode="contain"
              source={{ uri: `data:image/jpeg;base64,${hotel.picture}` }}
            />
          </View>
        )}

        <View style={tw`m-5`}>
          <TextInput
            label="Département"
            autoCompleteType="off"
            value={hotel.department}
            onFocus={() => setShowdepAutocompletion(true)}
            onChangeText={(department) => setHotel({ ...hotel, department })}
            onBlur={() => {
              if (hotel.department) setDepartmentFilled(true);
            }}
          />
          {showdepAutocompletion && (
            <DepartmentAutocompletion
              onAutocompletionItemPress={(departmentName, codeDepartment) => {
                setHotel({ ...hotel, department: departmentName });
                setCodeDepartment(codeDepartment);
                setShowdepAutocompletion(false);
              }}
              inputQuery={hotel.department}
            />
          )}
        </View>

        {departmentFilled && (
          <View style={tw`m-5`}>
            <TextInput
              label="Ville"
              autoCompleteType="off"
              value={hotel.city}
              onChangeText={(city) => setHotel({ ...hotel, city })}
              onFocus={() => setshowvilleAutocompletion(true)}
            />
            {showvilleAutocompletion && (
              <CityAutocompletion
                inputQuery={hotel.city}
                codeDepartment={codeDepartment}
                onAutocompletionItemPress={(cityName) => {
                  setHotel({ ...hotel, city: cityName });
                  setshowvilleAutocompletion(false);
                }}
              />
            )}
          </View>
        )}
        <View style={tw`flex items-center`}>
          <Button
            disabled={!formValid}
            onPress={() => {}}
            style={tw`w-1/2 mb-8`}
            icon="add"
            mode="contained">
            Ajouter
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const createNullHotel = () => {
  return {
    name: undefined,
    stars: undefined,
    description: undefined,
    category: undefined,
    picture: undefined,
    department: undefined,
    city: undefined,
  };
};

export default HotelForm;
