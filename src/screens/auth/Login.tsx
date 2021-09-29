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
import UserContext from '../../context/UserContext';
import SnackbarMessageContextInterface from '../../interfaces/SnackbarMessageContext';
import User from '../../interfaces/User';

const Login = ({ route, navigation }) => {
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
  const { setUserContext } = useContext(UserContext);

  useEffect(() => {
    let isFormValid = true;

    for (const key in user) {
      if (
        (user[key] === undefined || user[key] === '') &&
        key != 'id' &&
        key != 'username'
      ) {
        isFormValid = false;
      }
    }
    setFormValid(isFormValid);
    // console.log(user);
  }, [user]);

  const formSubmit = async () => {
    axios
      .post(
        'https://cefii-developpements.fr/pol1149/explorePdlServer/index.php',
        user,
        {
          params: {
            entity: 'user',
            action: 'login',
          },
        },
      )
      .then(async (result) => {
        // console.log(result.data);

        if (result.data) {
          let tempUser: User = result.data;
          // console.log('from db : ', tempUser);

          AsyncStorage.setItem('user', JSON.stringify(tempUser));
          setUserContext({ ...tempUser, setUserContext });
        } else {
          setSnackbarMessage({
            inputMessage: 'Une erreur est survenue',
            mode: 'error',
            setSnackbarMessage,
          });
        }
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
    <KeyboardAvoidingView
      style={tw`justify-center flex h-full`}
      behavior="padding">
      <Image
        style={tw`w-full mt-32 h-32 mb-5`}
        source={require('../../assets/images/Explore_logo_medium.png')}
      />
      <Card style={tw`rounded-xl w-11/12 m-auto p-5`}>
        <Title style={tw`text-center`}>Se Connecter</Title>
        <TextInput
          autoFocus
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
        <Button
          mode="contained"
          style={tw`p-1 mt-5`}
          disabled={!formValid}
          onPress={formSubmit}>
          Se connecter
        </Button>
        <Button
          style={tw`p-5`}
          color="#3786b8"
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          ou s'enregistrer
        </Button>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default Login;
