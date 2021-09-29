import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, Card, Divider, Subheading } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import PersonsPicker from '../../../components/PersonsPicker';
import StarPicker from '../../../components/StarPicker';
import SnackbarMessageContext from '../../../context/SnackbarMessageContext';
import UserContext from '../../../context/UserContext';
import Hotel from '../../../interfaces/Hotel';
import Reservation from '../../../interfaces/Reservation';

const HotelReservation = ({ route, navigation }) => {
  const { setSnackbarMessage } = useContext(SnackbarMessageContext);
  const user = useContext(UserContext);
  const [hotel, setHotel] = useState<Hotel>(route.params);
  const [reservation, setReservation] = useState<Reservation>({
    entrydate: undefined,
    exitdate: undefined,
    people: undefined,
    id_user: user.id,
    id_hotel: hotel.id,
  });
  const [formValid, setFormValid] = useState(false);

  const formSubmit = () => {
    console.log(reservation);

    axios
      .post(
        'https://cefii-developpements.fr/pol1149/explorePdlServer/index.php',
        reservation,
        {
          params: {
            entity: 'reservation',
            action: 'create',
          },
        },
      )
      .then((res) => {
        if (res.data === true) {
          setSnackbarMessage({
            inputMessage: 'Chambre réservée',
            mode: 'success',
            setSnackbarMessage,
          });
          navigation.popToTop();
          navigation.navigate('Mes Reservations');
        } else {
          dbError();
        }
      })
      .catch((err) => {
        dbError();
        console.error(err);
      });
  };

  const dbError = () => {
    setSnackbarMessage({
      inputMessage: 'Erreur lors de la réservation',
      mode: 'error',
      setSnackbarMessage,
    });
  };

  useEffect(() => {
    let isFormValid = true;

    for (const key in reservation) {
      if (!reservation[key]) {
        isFormValid = false;
      }
    }
    setFormValid(isFormValid);
  }, [reservation]);

  let today = new Date();
  useEffect(() => {
    // console.log(reservation);
  }, [reservation]);

  return (
    <ScrollView>
      <Card>
        <Card.Title
          title={hotel.name}
          subtitle={`${hotel.department} - ${hotel.city}`}
        />
        <Card.Content>
          <View style={tw`flex flex-row opacity-50 my-2`}>
            <StarPicker disabled inputRating={hotel.stars} />
          </View>
          <View style={tw`flex items-center my-2`}>
            <PersonsPicker
              callback={(amount) =>
                setReservation({ ...reservation, people: amount })
              }
            />
          </View>
          <View style={tw`mt-10`}>
            <Subheading>Date d'entrée : </Subheading>
            <DatePicker
              date={reservation.entrydate ? reservation.entrydate : today}
              onDateChange={(date: Date) => {
                setReservation({ ...reservation, entrydate: date });
              }}
              mode="date"
              minimumDate={today}
              maximumDate={
                new Date(
                  today.getFullYear() + 2,
                  today.getMonth(),
                  today.getDate(),
                )
              }
              locale="fr"
            />
            <Divider style={tw`mb-10`} />
            {reservation.entrydate && (
              <>
                <Subheading>Date de sortie : </Subheading>
                <DatePicker
                  date={reservation.exitdate ? reservation.exitdate : today}
                  onDateChange={(date: Date) => {
                    setReservation({ ...reservation, exitdate: date });
                  }}
                  mode="date"
                  minimumDate={
                    reservation.entrydate ? reservation.entrydate : today
                  }
                  maximumDate={
                    new Date(
                      today.getFullYear() + 2,
                      today.getMonth(),
                      today.getDate(),
                    )
                  }
                  locale="fr"
                />
              </>
            )}
            <Button
              style={tw`mx-10 mt-10`}
              mode="contained"
              disabled={!formValid}
              onPress={formSubmit}>
              Réserver
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default HotelReservation;
