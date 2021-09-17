import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';

export const Star = ({ onPress, filled }) => {
  const [IconName, setIconName] = useState('star-outline');

  useEffect(() => {
    setIconName(filled ? 'star' : 'star-outline');
  }, [filled]);

  return (
    <Icon
      onPress={onPress}
      style={tw`p-3`}
      name={IconName}
      size={25}
      color="gold"
    />
  );
};
