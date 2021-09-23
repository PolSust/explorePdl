import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';

interface Props {
  extraStyles?: any;
  callback: (amount: number) => void;
}

const PersonsPicker = ({ extraStyles, callback: callBack }: Props) => {
  const [amount, setAmount] = useState(0);
  const limit = 5;

  const increment = () => {
    if (amount == limit) return;
    setAmount((oldAmount) => oldAmount + 1);
  };

  const decrement = () => {
    if (amount == 0) return;
    setAmount((oldAmount) => oldAmount - 1);
  };

  useEffect(() => {
    callBack(amount);
  }, [amount]);

  return (
    <View
      style={[
        tw`flex items-center flex-row border border-black py-1 px-3 rounded`,
        extraStyles,
      ]}>
      <Text style={s.text}>Pour {amount} Personnes</Text>
      <TouchableRipple
        style={tw`px-4 py-2`}
        onPress={decrement}
        disabled={amount == 0}>
        <Icon name="remove" color={amount == 0 ? '#000' : '#69A2B0'} />
      </TouchableRipple>

      <TouchableRipple
        style={tw`px-4 py-2`}
        onPress={increment}
        disabled={amount == limit}>
        <Icon name="add" color={amount == limit ? '#000' : '#69A2B0'} />
      </TouchableRipple>
    </View>
  );
};

const s = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});

export default PersonsPicker;
