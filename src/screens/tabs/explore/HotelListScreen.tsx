import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import HotelsList from '../../../components/HotelsList';
import SearchHotels from '../../../components/SearchHotels';
import UserContext from '../../../context/UserContext';
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

  const user = useContext(UserContext);

  return (
    <SafeAreaView style={tw`flex items-center w-full`}>
      <View style={tw`flex flex-row w-11/12 mt-4 justify-between`}>
        <View style={tw`flex-grow mb-5 h-10`}>
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
        {user.isAdmin == true && (
          <View style={tw`flex-grow-0 ml-2`}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('HotelForm')}>
              <Icon name={'add-circle'} size={30} />
            </Button>
          </View>
        )}
      </View>

      <HotelsList hotelsInput={hotelsInput} navigation={navigation} />
    </SafeAreaView>
  );
};

export default HotelListScreen;
