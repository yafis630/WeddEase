import React from 'react';
import CardList from './CardList';
import bridew1 from '../assets/bridew1.png';
import bridew2 from '../assets/bridew2.png';
import bridew3 from '../assets/bridew3.png';
import bridew4 from '../assets/bridew4.png';
import bridew5 from '../assets/bridew5.png';
import bridew6 from '../assets/bridew6.png';
import bridew7 from '../assets/bridew7.png';
import bridew8 from '../assets/bridew8.png';
import bridew9 from '../assets/bridew9.png';
import bridew10 from '../assets/bridew10.png';
import bridew11 from '../assets/bride11.png';
import bridew12 from '../assets/bridew12.png';


const subcategory6 = () => {
  const data = [
    {
      id: 1,
      image: bridew1,
      name: '"The Beauty Fix - Makeup Artist"',
      description: '$40,000 per day.',
    },
    {
      id: 2,
      image: bridew2,
      name: '"aleesha makeup"',
      description: '$30,000 per day',
    },
    {
        id: 3,
        image: bridew3,
        name: '"Makeup By Nureen"',
        description: ' $25,000 per day' ,
      },
      {
        id: 4,
        image: bridew4,
        name: '"Masrat Makeovers"',
        description: '$15,000 per day',
      },
      {
        id: 5,
        image: bridew5,
        name: '"zoya makeovers"',
        description: '$19000 per day',
      },
      {
        id: 6,
        image: bridew6,
        name: '"Makeup By Suzain"',
        description: '$25000 per day',
      },
      {
        id: 7,
        image: bridew7,
        name: '"Makeup by AyeshaNoor"',
        description: '$8000 per day',
      },
      {
        id: 8,
        image: bridew8,
        name: '"Sandhyas Makeover"',
        description: '$50000 per day',
      },
      {
        id: 9,
        image: bridew9,
        name: '"TMirar Beauty Lounge"',
        description: '$90000 per day',
      },
      {
        id: 10,
        image: bridew10,
        name: '"Nehaaz_bridalmakeup "',
        description: '$80000 per day',
      },
      {
        id: 11,
        image: bridew11,
        name: '"La Bellezza Salon"',
        description: '$750000 per day',
      },
      {
        id: 12,
        image: bridew12,
        name: '"Golden Makeup Studio"',
        description: '$190000 per day',
      },
  ];

  return (
    <div>
      <h1>
  Bridal Wear
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default subcategory6;
