import React from 'react';
import CardList from './CardList';
import g1 from '../assets/g1.png';
import g2 from '../assets/g2.png';
import g3 from '../assets/g3.png';
import g4 from '../assets/g4.png';
import g5 from '../assets/g5.png';
import g6 from '../assets/g6.png';
import g7 from '../assets/g7.png';
import g8 from '../assets/g8.png';
import g9 from '../assets/g9.png';
const gowns = () => {
  const data = [
    {
      id: 1,
      image: g1,
      name: '"Shahi Poshak Bridals"',
      description: 'Rs 10,000 -2,70000.',
    },
    {
      id: 2,
      image: g2,
      name: '"Kehzabr The Boutique"',
      description: 'Rs 50,000-2,00000',
    },
    {
        id: 3,
        image: g3,
        name: '"Hoor"',
        description: ' Rs 3,000,60,000' ,
      },
     
      {
        id: 4,
        image: g4,
        name: '"A J Bridal Lehanga"',
        description: 'Rs 5000-8000',
      },
      {
        id: 5,
        image: g5,
        name: '"Sheikh Fajr"',
        description: 'Rs 3,00000-5,00000',
      },
      {
        id: 6,
        image: g6,
        name: '"Bismillah Lehanga"',
        description: 'Rs 8,000-80,000',
      },
      {
        id: 7,
        image: g7,
        name: '"Shehlas Designer Collection"',
        description: 'Rs 9000-150000',
      },
      {
        id: 8,
        image: g8,
        name: '"Tul Palav"',
        description: 'Rs 5000-60000 ',
      },
      {
        id: 9,
        image: g9,
        name: '"Valley Kart"',
        description: 'Rs 3000- 40,000',
      },
      
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
  Gowns
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default gowns;
