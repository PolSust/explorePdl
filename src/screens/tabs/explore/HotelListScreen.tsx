import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import HotelsList from '../../../components/HotelsList';
import SearchHotels from '../../../components/SearchHotels';
import Hotel from '../../../interfaces/Hotel';

interface Props {
  /**
   * Navigation will depend on the navigator that calls it
   */
  navigation: any;
  route: any;
}

const HotelListScreen = ({ route, navigation }: Props) => {
  const [hotelsInput, setHotelsInput] = useState<Hotel[]>(route.params.hotels);

  return (
    <View style={tw`flex items-center w-full`}>
      <View style={tw`flex flex-row w-11/12 mt-4 mb-3 justify-between`}>
        <View style={tw`w-9/12`}>
          <SearchHotels
            defaultValue={route.params.query}
            queryEmptyCallback={() => {
              setHotelsInput([]);
            }}
            itemSelectCallback={(hotels: Hotel[]) => {
              setHotelsInput(hotels);
            }}
            inputStyle={tw`text-sm`}
          />
        </View>
        <Button
          style={tw`max-h-14`}
          mode="contained"
          onPress={() => navigation.navigate('HotelForm')}>
          <Icon name={'add-circle'} size={30} />
        </Button>
      </View>
      <HotelsList hotelsInput={hotelsInput} navigation={navigation} />
    </View>
  );
};

export default HotelListScreen;
