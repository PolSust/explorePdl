import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, Card, Divider, Subheading } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import PersonsPicker from '../../../components/PersonsPicker';
import StarPicker from '../../../components/StarPicker';
import Hotel from '../../../interfaces/Hotel';
import Reservation from '../../../interfaces/Reservation';

const HotelReservation = ({ route, navigation }) => {
  const [hotel, setHotel] = useState<Hotel>(route.params);
  const [reservation, setReservation] = useState<Reservation>({
    entrydate: undefined,
    exitdate: undefined,
    people: undefined,
    id_hotel: hotel.id,
  });
  const [formValid, setFormValid] = useState(false);

  const formSubmit = () => {};

  useEffect(() => {
    let isFormValid = true;

    for (const key in reservation) {
      if (
        (reservation[key] == null || reservation[key] == '') &&
        key != 'id_hotel'
      ) {
        isFormValid = false;
      }
    }
    setFormValid(isFormValid);
  }, [reservation]);

  let today = new Date();
  useEffect(() => {
    console.log(reservation);
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
