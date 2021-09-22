import React from 'react';
import { View } from 'react-native';
import {
  Card,
  Colors,
  IconButton,
  Paragraph,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import Hotel from '../interfaces/Hotel';
import StarPicker from './StarPicker';

interface Props {
  hotel: Hotel;
  navigation: any;
}

const HotelCard = ({ hotel, navigation }: Props) => {
  const gotoEdit = () => {
    navigation.navigate('HotelForm', hotel);
  };

  const deleteHotel = () => {};

  return (
    <Card style={tw`w-11/12 my-1`}>
      <View style={tw`flex flex-row p-4 justify-between items-center`}>
        <Title style={tw`text-2xl`}>{hotel.name}</Title>
        {hotel.category == 1 && <Subheading>Niège</Subheading>}
        {hotel.category == 2 && <Subheading>Plage</Subheading>}
        {hotel.category == 3 && <Subheading>Forêt</Subheading>}
      </View>
      <View style={tw`pl-5`}>
        <Subheading>{hotel.department}</Subheading>
        <Subheading style={{ fontWeight: 'bold' }}>{hotel.city}</Subheading>
      </View>
      <View style={tw`flex flex-row`}>
        <StarPicker inputRating={hotel.stars} disabled />
      </View>
      <Card.Content style={tw`flex flex-row`}>
        <Paragraph style={tw`w-10/12`}>
          {hotel.description?.substring(0, 200)}
          {hotel.description && hotel.description.length > 200 && (
            <Text>...</Text>
          )}
        </Paragraph>
        <View style={tw`w-2/12 flex items-center`}>
          <IconButton
            icon="pencil"
            color={Colors.black}
            size={30}
            onPress={gotoEdit}
          />
          <IconButton
            icon="trash"
            color={Colors.red300}
            size={30}
            onPress={deleteHotel}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default HotelCard;
