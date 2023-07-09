import React from 'react';
import CardList from './CardList';
import mk1 from '../assets/mk1.png';
import mk2 from '../assets/mk2.png';
import mk3 from '../assets/mk3.png';
import mk4 from '../assets/mk4.png';
import mk5 from '../assets/mk5.png';
import mk6 from '../assets/mk6.png';
import mk7 from '../assets/mk7.png';
import mk8 from '../assets/mk8.png';
import mk9 from '../assets/mk9.png';
import mk10 from '../assets/mk10.png';
import mk11 from '../assets/mk11.png';
import mk12 from '../assets/mk12.png';


const makeup = () => {
  const data = [
    {
      id: 1,
      image: mk1,
      name: '"The Beauty Fix - Makeup Artist"',
      description: 'Rs 40,000 per day.',
    },
    {
      id: 2,
      image: mk2,
      name: '"aleesha makeup"',
      description: 'Rs 30,000 per day',
    },
    {
        id: 3,
        image: mk3,
        name: '"Makeup By Nureen"',
        description: ' Rs 25,000 per day' ,
      },
      {
        id: 4,
        image: mk4,
        name: '"Masrat Makeovers"',
        description: 'Rs 15,000 per day',
      },
      {
        id: 5,
        image: mk5,
        name: '"zoya makeovers"',
        description: 'Rs 19000 per day',
      },
      {
        id: 6,
        image: mk6,
        name: '"Makeup By Suzain"',
        description: 'Rs 25000 per day',
      },
      {
        id: 7,
        image: mk7,
        name: '"Makeup by AyeshaNoor"',
        description: 'Rs 8000 per day',
      },
      {
        id: 8,
        image: mk8,
        name: '"Sandhyas Makeover"',
        description: 'RS 5000 per day',
      },
      {
        id: 9,
        image: mk9,
        name: '"TMirar Beauty Lounge"',
        description: 'Rs 9000 per day',
      },
      {
        id: 10,
        image: mk10,
        name: '"Nehaaz_bridalmakeup "',
        description: 'Rs 8000 per day',
      },
      {
        id: 11,
        image: mk11,
        name: '"La Bellezza Salon"',
        description: 'Rs 75000 per day',
      },
      {
        id: 12,
        image: mk12,
        name: '"Golden Makeup Studio"',
        description: 'Rs 19000 per day',
      },
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
  Bridal Makeup
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default makeup;
