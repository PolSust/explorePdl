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
      <View style={tw`flex flex-row p-4 justify-between items-center`}>
        <Title>{hotel.name}</Title>
        <Avatar.Image
          size={50}
          source={{ uri: `data:image/jpeg;base64,${hotel.picture}` }}
        />
      </View>
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
