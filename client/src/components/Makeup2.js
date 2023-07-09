import React from 'react';
import CardList from './CardList';
import fmk1 from '../assets/fmk1.png';
import fmk2 from '../assets/fmk2.png';
import fmk3 from '../assets/fmk3.png';
import fmk4 from '../assets/fmk4.png';
import fmk5 from '../assets/fmk5.png';
import fmk6 from '../assets/fmk6.png';

const makeup2 = () => {
  const data = [
    {
      id: 1,
      image: fmk1,
      name: '"The Beauty Fix - Makeup Artist"',
      description: 'Rs 40,000 per day.',
    },
    {
      id: 2,
      image: fmk2,
      name: '"aleesha makeup"',
      description: 'Rs 30,000 per day',
    },
    {
        id: 3,
        image: fmk3,
        name: '"Makeup By Nureen"',
        description: ' Rs 25,000 per day' ,
      },
      {
        id: 4,
        image: fmk4,
        name: '"Masrat Makeovers"',
        description: 'Rs 15,000 per day',
      },
      {
        id: 5,
        image: fmk5,
        name: '"zoya makeovers"',
        description: 'Rs 19000 per day',
      },
      {
        id: 6,
        image: fmk6,
        name: '"Makeup By Suzain"',
        description: 'Rs 25000 per day',
      },
      
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
  Family Makeup
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default makeup2;
