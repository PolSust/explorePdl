import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import CategorySelector from '../../components/CategorySelector';
import CityAutocompletion from '../../components/CityAutocompletion';
import DepartmentAutocompletion from '../../components/DepartmentAutocompletion';
import StarPicker from '../../components/StarPicker';
import Hotel from '../../interfaces/Hotel';
import ImageChoiceModal from '../../components/ImageChoiceModal';
import axios from 'axios';
import SnackbarMessageProps from '../../interfaces/SnackbarMessageProps';
import SnackbarMessageContext from '../../context/SnackbarMessageContext';
import SnackbarMessageContextInterface from '../../interfaces/SnackbarMessageContext';
import { useNavigation } from '@react-navigation/core';

const HotelForm = ({ route, navigation }) => {
  let hotelInput: Hotel = route.params;
  console.log('input', hotelInput);

  // If the hotelProp is undefined it means we are creating a new hotel
  type mode = 'create' | 'edit';
  let mode: mode = 'edit';
  if (!hotelInput) {
    hotelInput = createUndefinedHotel();
    mode = 'create';
  }
  const [hotel, setHotel] = useState<Hotel>(hotelInput);
  const [departmentFilled, setDepartmentFilled] = useState<boolean>(
    !hotel.department ? false : true,
  );
  const [formValid, setFormValid] = useState<boolean>(false);

  const [showdepAutocompletion, setShowdepAutocompletion] =
    useState<boolean>(false);

  const [showvilleAutocompletion, setshowvilleAutocompletion] =
    useState<boolean>(false);

  const [codeDepartment, setCodeDepartment] = useState<number | string>();

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const { setSnackbarMessage } = useContext<SnackbarMessageContextInterface>(
    SnackbarMessageContext,
  );

  useEffect(() => {
    let isFormValid = true;

    for (const key in hotel) {
      if ((hotel[key] == null || hotel[key] == '') && key != 'id') {
        isFormValid = false;
      }
    }
    setFormValid(isFormValid);
  }, [hotel]);

  const formSubmit = () => {
    setButtonLoading(true);
    axios
      .post(
        'https://cefii-developpements.fr/pol1149/explorePdlServer/index.php',
        hotel,
        {
          params: {
            entity: 'hotel',
            action: 'create',
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          let msg =
            mode === 'create'
              ? "L'hôtel a bien été créé"
              : "L'hôtel a bien été modifié";

          setButtonLoading(false);
          setSnackbarMessage({
            inputMessage: `${msg} !`,
            mode: 'success',
            setSnackbarMessage,
          });
          navigation.goBack();
        }
      })
      .catch((error) => {
        setButtonLoading(false);
        console.error(error);
      });
  };

  return (
    <ScrollView>
      <View style={tw`w-full h-full`}>
        <TextInput
          mode="outlined"
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
          mode="outlined"
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
            mode="outlined"
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
              mode="outlined"
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
            onPress={formSubmit}
            loading={buttonLoading}
            style={tw`w-1/2 mb-8`}
            icon="add"
            mode="contained">
            {mode === 'edit' ? 'Modifier' : 'Ajouter'}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const createUndefinedHotel = () => {
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
