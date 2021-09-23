import axios from 'axios';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Colors,
  IconButton,
  Paragraph,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import SnackbarMessageContext from '../context/SnackbarMessageContext';
import Hotel from '../interfaces/Hotel';
import SnackbarMessageContextInterface from '../interfaces/SnackbarMessageContext';
import ConfirmModal from './ConfirmModal';
import StarPicker from './StarPicker';

interface Props {
  hotel: Hotel;
  navigation: any;
  deleteCallback: (id: number | string | undefined) => void;
}

const HotelCard = ({ hotel, navigation, deleteCallback }: Props) => {
  const [confirmQuestion, setConfirmQuestion] = useState('');

  const { setSnackbarMessage } = useContext<SnackbarMessageContextInterface>(
    SnackbarMessageContext,
  );

  const deleteHotel = (confirmed: boolean) => {
    if (confirmed) {
      axios
        .post(
          'https://cefii-developpements.fr/pol1149/explorePdlServer/index.php',
          hotel.id,
          {
            params: {
              entity: 'hotel',
              action: 'delete',
            },
          },
        )
        .then((response) => {
          if (response.status == 200) {
            deleteCallback(hotel.id);

            setSnackbarMessage({
              inputMessage: 'Hotel supprimé avec success !',
              mode: 'success',
              setSnackbarMessage,
            });
          }
        })
        .catch((error) => {
          setSnackbarMessage({
            inputMessage: 'Une erreur est survenue !',
            mode: 'error',
            setSnackbarMessage,
          });
        });
    }
    setConfirmQuestion('');
  };

  return (
    <Card style={tw`w-11/12 my-1 py-4`}>
      <View style={tw`flex flex-row p-4 justify-between items-center`}>
        <Title style={tw`text-2xl`}>{hotel.name}</Title>
        {hotel.category == 1 && <Subheading>Niège</Subheading>}
        {hotel.category == 2 && <Subheading>Plage</Subheading>}
        {hotel.category == 3 && <Subheading>Forêt</Subheading>}
      </View>
      <View style={tw`pl-7`}>
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
        <View style={tw`w-2/12 flex items-center justify-center`}>
          <IconButton
            icon="pencil"
            color={Colors.black}
            size={30}
            onPress={() => navigation.navigate('HotelForm', hotel)}
          />
          <IconButton
            icon="trash"
            color={Colors.red300}
            size={30}
            onPress={() => {
              setConfirmQuestion('Voulez Vous Supprimer cette Hotel');
            }}
          />
        </View>
      </Card.Content>
      <Button
        onPress={() => navigation.navigate('HotelReservation', hotel)}
        mode="contained"
        style={tw`m-5`}>
        Réserver
      </Button>
      <ConfirmModal question={confirmQuestion} callback={deleteHotel} />
    </Card>
  );
};

export default HotelCard;
