import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import Hotel from '../interfaces/Hotel';
import HotelCard from './HotelCard';

interface Props {
  navigation: any;
  hotelsInput: Hotel[];
}

const HotelsList = ({ navigation, hotelsInput }: Props) => {
  const [hotels, setHotels] = useState<Hotel[] | undefined>(hotelsInput);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setHotels(hotelsInput);
  }, [hotelsInput]);

  const fetchHotels = async () => {
    // console.log('fetiching hotels...');
    const response = await axios.get(
      'https://cefii-developpements.fr/pol1149/explorePdlServer',
      {
        params: {
          entity: 'hotel',
          action: 'getAll',
        },
      },
    );
    // console.log('hotels fetched', response.data);

    setHotels(response.data);
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      if (hotelsInput.length == 0) {
        fetchHotels();
      } else {
        setHotels(hotelsInput);
        setLoading(false);
      }
    }
  }, [hotels]);

  return (
    <SafeAreaView style={tw`mb-40 w-full`}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              fetchHotels();
            }}
            tintColor="#69A2B0"
          />
        }>
        <View style={tw`flex items-center my-5`}>
          {!hotels && <Text>loading...</Text>}
          {hotels?.map((hotel: Hotel, i) => (
            <HotelCard
              deleteCallback={(id) => {
                setHotels(hotels.filter((hotel) => hotel.id !== id));
              }}
              key={i}
              hotel={hotel}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HotelsList;
