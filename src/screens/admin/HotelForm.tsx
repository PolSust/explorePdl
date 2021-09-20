import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput, Title } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import tw from 'tailwind-react-native-classnames';
import CategorySelector from '../../components/CategorySelector';
import CityAutocompletion from '../../components/CityAutocompletion';
import DepartmentAutocompletion from '../../components/DepartmentAutocompletion';
import StarPicker from '../../components/StarPicker';
import Hotel from '../../interfaces/Hotel';
import ImageChoiceModal from '../../components/ImageChoiceModal';

const HotelForm = (hotelInput: Hotel) => {
  const [hotel, setHotel] = useState(hotelInput);
  const [departmentFilled, setDepartmentFilled] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const [showdepAutocompletion, setShowdepAutocompletion] =
    useState<boolean>(false);

  const [showvilleAutocompletion, setshowvilleAutocompletion] =
    useState<boolean>(false);

  const [codeDepartment, setCodeDepartment] = useState<number | string>();

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
          <CategorySelector />
        </View>

        <View style={tw`flex items-center m-5`}>
          <Button
            style={tw`w-6/12`}
            icon="camera"
            mode="contained"
            onPress={() => {
              setShowModal(true);
              // launchImageLibrary({ mediaType: 'photo' }, );
            }}>
            Image
          </Button>
          <ImageChoiceModal showModal={showModal} />
        </View>

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
      </View>
    </ScrollView>
  );
};

export default HotelForm;
