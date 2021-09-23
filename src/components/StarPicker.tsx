import React, { useEffect, useState } from 'react';
import { Star } from './Star';

interface Props {
  inputRating: number | undefined;
  disabled: boolean;
  callback?: (rating: number) => void;
}

const StarPicker = ({ inputRating = 0, disabled, callback }: Props) => {
  const [rating, setRating] = useState(inputRating);
  const [filled, setFilled] = useState([false, false, false, false, false]);

  useEffect(() => {
    if (callback) {
      callback(rating);
    }

    let areFilled: boolean[] = [];

    for (let i = 0; i < rating; i++) {
      areFilled.push(true);
    }
    setFilled(areFilled);
  }, [rating]);

  return (
    <>
      <Star
        filled={filled[0]}
        onPress={() => {
          if (!disabled) setRating(1);
        }}
      />
      <Star
        filled={filled[1]}
        onPress={() => {
          if (!disabled) setRating(2);
        }}
      />
      <Star
        filled={filled[2]}
        onPress={() => {
          if (!disabled) setRating(3);
        }}
      />
      <Star
        filled={filled[3]}
        onPress={() => {
          if (!disabled) setRating(4);
        }}
      />
      <Star
        filled={filled[4]}
        onPress={() => {
          if (!disabled) setRating(5);
        }}
      />
    </>
  );
};

export default StarPicker;
