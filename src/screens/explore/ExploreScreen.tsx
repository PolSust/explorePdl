import React from 'react';
import {Image, ImageBackground, View} from 'react-native';

import tw from 'tailwind-react-native-classnames';
import SearchHotels from '../../components/SearchHotels';

const ExploreScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/homeBg.png')}
      resizeMode="cover"
      style={tw`flex items-center justify-center h-full `}>
      <View style={tw`relative w-11/12 bottom-20`}>
        <Image
          style={tw`w-full h-32 mb-5`}
          source={require('../../assets/images/Explore_logo_medium.png')}
        />
        <SearchHotels />
      </View>
    </ImageBackground>
  );
};

export default ExploreScreen;