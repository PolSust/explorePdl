import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card, Title } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import PersonsPicker from '../../components/PersonsPicker';
import StarPicker from '../../components/StarPicker';
import Hotel from '../../interfaces/Hotel';

const HotelReservation = ({ route, navigation }) => {
  console.log(route.params);
  const [hotel, setHotel] = useState<Hotel>(route.params);

  return (
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
          <PersonsPicker callback={(amount) => console.log(amount)} />
        </View>
        <View>
          <Calendar
            minDate={Date.now()}
            markingType={'period'}
            markedDates={{
              '2021-10-22': { startingDay: true, color: 'green' },
              '2021-10-26': { endingDay: true, color: 'green' },
            }}
            firstDay={1}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default HotelReservation;
