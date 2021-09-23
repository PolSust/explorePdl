import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import HotelsList from '../../components/HotelsList';
import SearchHotels from '../../components/SearchHotels';

const AdminScreen = ({ navigation }) => {
  return (
    <View style={tw`flex items-center w-full`}>
      <View style={tw`flex flex-row w-11/12 mt-4 mb-3`}>
        <SearchHotels
          style={tw`w-9/12 mr-3 rounded-full`}
          inputStyle={tw`text-sm`}
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate('HotelForm')}>
          <Icon name={'add-circle'} size={30} />
        </Button>
      </View>
      <HotelsList navigation={navigation} />
    </View>
  );
};

export default AdminScreen;
