import React, { useEffect, useState } from 'react';
import { Star } from './Star';

const StarPicker = ({ inputRating }) => {
  const [rating, setRating] = useState(inputRating);
  const [filled, setFilled] = useState([false, false, false, false, false]);

  useEffect(() => {
    let areFilled: boolean[] = [];

    for (let i = 0; i < rating; i++) {
      areFilled.push(true);
    }
    setFilled(areFilled);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  return (
    <>
      <Star filled={filled[0]} onPress={() => setRating(1)} />
      <Star filled={filled[1]} onPress={() => setRating(2)} />
      <Star filled={filled[2]} onPress={() => setRating(3)} />
      <Star filled={filled[3]} onPress={() => setRating(4)} />
      <Star filled={filled[4]} onPress={() => setRating(5)} />
    </>
  );
};

export default StarPicker;
