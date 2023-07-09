import React from 'react';
import CardList from './CardList';
import veg1 from '../assets/veg1.png';
import veg3 from '../assets/veg3.png';
import nveg2 from '../assets/nveg2.png';
import nveg3 from '../assets/nveg3.png';


const nonVeg = () => {
  const data = [
    {
      id: 1,
      image: veg3,
      name: '"Parsas Sanatnagar"',
      description: '  Rs 420 per plate.',
    },
   
    {
      id: 2,
      image: veg1,
      name: '"Highway Grills Nowgam"',
      description: 'Rs 320 per plate.',
    },
   
    {
        id: 3,
        image: veg3,
        name: '"Bombay Box Rawalpora"',
        description: ' Rs 370 per plate' ,
      },
      {
        id: 4,
        image: nveg3,
        name: '"Mughal Durbar "',
        description: 'Rs 950 per plate',
      },
      {
        id: 5,
        image: nveg2,
        name: '"Pakeeza Restaurant"',
        description: 'Rs 1200 per plate',
      },
      {
        id: 6,
        image: nveg3,
        name: '"Chinar Kashmiri Wazwans"',
        description: 'Rs 700 per plate',
      },
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
  Veg/NonVeg
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default nonVeg;
