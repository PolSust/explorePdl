import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Text } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import ConfirmModal from '../../../components/ConfirmModal';
import ReservationCard from '../../../components/ReservationCard';
import SnackbarMessageContext from '../../../context/SnackbarMessageContext';
import UserContext from '../../../context/UserContext';
import Hotel from '../../../interfaces/Hotel';
import Reservation from '../../../interfaces/Reservation';

const ReservationsScreen = () => {
  const user = useContext(UserContext);
  const [reservationsInfo, setReservationsInfo] = useState<any[]>();

  const { setSnackbarMessage } = useContext(SnackbarMessageContext);
  const [question, setQuestion] = useState<string>('');

  const [deletingReservationId, setDeletingReservationId] =
    useState<Reservation['id']>();

  const deleteReservation = async () => {
    console.log(deletingReservationId);

    const result = await axios.post(
      'https://cefii-developpements.fr/pol1149/explorePdlServer/index.php',
      deletingReservationId,
      {
        params: {
          entity: 'reservation',
          action: 'delete',
        },
      },
    );

    if (result.data === true) {
      removeDeletedFromArray();

      setSnackbarMessage({
        inputMessage: 'Réservation annulée',
        mode: 'success',
        setSnackbarMessage,
      });
    } else {
      setSnackbarMessage({
        inputMessage: 'Une erreur est survenue',
        mode: 'error',
        setSnackbarMessage,
      });
    }
  };

  const removeDeletedFromArray = () => {
    const newReservations = reservationsInfo?.filter(
      (reservation) => reservation.id !== deletingReservationId,
    );

    setReservationsInfo(newReservations);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const results = await axios.post(
      'https://cefii-developpements.fr/pol1149/explorePdlServer/index.php',
      user.id,
      {
        params: {
          entity: 'reservation',
          action: 'getByUser',
        },
      },
    );

    console.log(results.data);
    setReservationsInfo(results.data);
  };

  return (
    <>
      <ScrollView
        style={tw`h-full`}
        refreshControl={
          <RefreshControl
            refreshing={reservationsInfo === undefined}
            onRefresh={fetchReservations}
            tintColor="#69A2B0"
          />
        }>
        <View style={tw`mx-5 mt-5`}>
          {reservationsInfo?.length == 0 && (
            <Text style={tw`text-center text-lg`}>
              Vous n'avez aucune réservation
            </Text>
          )}

          {reservationsInfo ? (
            reservationsInfo.map((reservationInfo, idx) => (
              <ReservationCard
                deleteCallback={(id) => {
                  setDeletingReservationId(id);
                  console.log(id, deletingReservationId);
                  setQuestion(
                    'Voulez-vous vraiment supprimer cette réservation',
                  );
                }}
                extraStyles={`mb-2`}
                reservationInfo={reservationInfo}
                key={idx}
              />
            ))
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ScrollView>
      <ConfirmModal
        question={question}
        callback={(confirmed) => {
          setQuestion('');

          if (confirmed) {
            deleteReservation();
          }
        }}
      />
    </>
  );
};

export default ReservationsScreen;
