import React, { useContext } from 'react';
import { Image, ImageBackground, View } from 'react-native';

import tw from 'tailwind-react-native-classnames';
import SearchHotels from '../../../components/SearchHotels';
import UserContext from '../../../context/UserContext';
import Hotel from '../../../interfaces/Hotel';

const ExploreScreen = ({ route, navigation }) => {
  const user = useContext(UserContext);

  return (
    <ImageBackground
      source={require('../../../assets/images/homeBg.png')}
      resizeMode="cover"
      style={tw`flex items-center justify-center h-full`}>
      <View style={tw`relative w-11/12 bottom-40`}>
        <Image
          style={tw`w-full h-32 mb-5`}
          source={require('../../../assets/images/Explore_logo_medium.png')}
        />
        <View style={tw`w-full`}>
          <SearchHotels
            itemSelectCallback={(hotels: Hotel[], query) => {
              navigation.navigate('HotelListScreen', { hotels, query });
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ExploreScreen;
