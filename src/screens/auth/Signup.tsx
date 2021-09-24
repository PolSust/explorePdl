import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, View } from 'react-native';
import {
  Button,
  Card,
  Subheading,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import SnackbarMessageContext from '../../context/SnackbarMessageContext';
import SnackbarMessageContextInterface from '../../interfaces/SnackbarMessageContext';
import User from '../../interfaces/User';

const Signup = ({ route, navigation }) => {
  const { setSnackbarMessage } = useContext<SnackbarMessageContextInterface>(
    SnackbarMessageContext,
  );
  const [formValid, setFormValid] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    username: '',
    isAdmin: false,
  });

  useEffect(() => {
    let isFormValid = true;

    for (const key in user) {
      if ((user[key] === undefined || user[key] === '') && key != 'id') {
        isFormValid = false;
      }
    }
    setFormValid(isFormValid);
    console.log(user);
  }, [user]);

  const formSubmit = async () => {
    axios
      .post(
        'https://cefii-developpements.fr/pol1149/explorePdlServer/index.php',
        user,
        {
          params: {
            entity: 'user',
            action: 'create',
          },
        },
      )
      .then(async (result) => {
        console.log(result.data);

        let tempUser: User = {
          email: user.email,
          isAdmin: user.isAdmin,
          password: '',
          username: user.username,
          id: result.data,
        };

        AsyncStorage.setItem('user', JSON.stringify(tempUser));

        let item = await AsyncStorage.getItem('user');
        console.log(item);

        setSnackbarMessage({
          inputMessage: 'Votre compte a bien été créé',
          mode: 'success',
          setSnackbarMessage,
        });
      })
      .catch((error) => {
        console.error(error);

        setSnackbarMessage({
          inputMessage: 'Une erreur est survenue',
          mode: 'error',
          setSnackbarMessage,
        });
      });
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <Image
        style={tw`w-full mt-32 h-32 mb-5`}
        source={require('../../assets/images/Explore_logo_medium.png')}
      />
      <Card style={tw`rounded-xl w-11/12 m-auto p-5`}>
        <Title style={tw`text-center`}>S'enregister</Title>
        <TextInput
          label="Votre Nom"
          autoCompleteType="name"
          mode="outlined"
          style={tw`my-3`}
          onChangeText={(text) => setUser({ ...user, username: text })}
        />
        <TextInput
          label="Email"
          autoCompleteType="email"
          mode="outlined"
          style={tw`my-3`}
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
        <TextInput
          label="Mot de passe"
          autoCompleteType="password"
          secureTextEntry
          mode="outlined"
          style={tw`my-3`}
          onChangeText={(text) => setUser({ ...user, password: text })}
        />
        <Button disabled={!formValid} style={tw`p-5`} onPress={formSubmit}>
          Créer mon compte
        </Button>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default Signup;
