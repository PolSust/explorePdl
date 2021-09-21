import React from 'react';
import { View } from 'react-native';
import { Avatar, Card, Paragraph, Text, Title } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import Hotel from '../interfaces/Hotel';
import StarPicker from './StarPicker';
import uuid from 'react-native-uuid';

const HotelCard = (hotel: Hotel) => {
  return (
    <Card style={tw`w-11/12 my-1`}>
      <Card.Title title={hotel.name} />
      <Avatar.Image size={24} source={require(hotel.picture)} />
      <View style={tw`flex flex-row`}>
        <StarPicker inputRating={hotel.stars} disabled />
      </View>
      <Card.Content>
        <Paragraph>
          {hotel.description?.substring(0, 100)}
          {hotel.description && hotel.description.length > 100 && (
            <Text>...</Text>
          )}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default HotelCard;
