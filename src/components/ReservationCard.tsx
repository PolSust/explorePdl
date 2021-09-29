import axios from 'axios';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import SnackbarMessageContext from '../context/SnackbarMessageContext';
import Hotel from '../interfaces/Hotel';
import Reservation from '../interfaces/Reservation';
import ConfirmModal from './ConfirmModal';

interface Props {
  reservationInfo: Reservation & Hotel;
  /**
   * Extra styles in tailwind format
   */
  extraStyles: string;
  deleteCallback: (id: Reservation['id']) => void;
}

const ReservationCard = ({
  reservationInfo,
  extraStyles,
  deleteCallback,
}: Props) => {
  const getDaysUntilEntrydate = (): number => {
    if (!reservationInfo.entrydate) return 0;

    const today = new Date();
    const entrydate = new Date(reservationInfo.entrydate);
    const entrydateDateInMilliseconds = entrydate.getTime();
    const todayInMilliseconds = today.getTime();

    return Math.round(
      (entrydateDateInMilliseconds - todayInMilliseconds) / 86400000,
    );
  };

  const daysUntil: number = getDaysUntilEntrydate();

  let message: string =
    daysUntil > 1 ? `Dans ${getDaysUntilEntrydate()} jours` : "D'Aujord'hui";

  message = daysUntil < 0 ? `De il y a ${Math.abs(daysUntil)} jours` : message;

  return (
    <Card style={tw`overflow-visible ${extraStyles}`}>
      <Card.Title
        style={tw`w-1/2`}
        title={reservationInfo.name}
        subtitle={reservationInfo.city}
      />
      <Card.Content>
        <Text>
          {message} à le {reservationInfo.exitdate}
        </Text>
      </Card.Content>
      <Card.Actions style={tw`my-3 mx-2`}>
        <Button
          onPress={() => {
            deleteCallback(reservationInfo.id);
          }}
          mode="outlined"
          color="red">
          Annuler
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ReservationCard;
