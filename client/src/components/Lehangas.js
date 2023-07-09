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


const lehangas = () => {
  const data = [
    {
      id: 1,
      image: bridew1,
      name: '"Shahi Poshak Bridals"',
      description: 'Rs 10,000 -2,70000.',
    },
    {
      id: 2,
      image: bridew2,
      name: '"Kehzabr The Boutique"',
      description: 'Rs 50,000-2,00000',
    },
    {
        id: 3,
        image: bridew3,
        name: '"Hoor"',
        description: ' Rs 3,000,60,000' ,
      },
     
      {
        id: 4,
        image: bridew4,
        name: '"A J Bridal Lehanga"',
        description: 'Rs 5000-8000',
      },
      {
        id: 5,
        image: bridew5,
        name: '"Sheikh Fajr"',
        description: 'Rs 3,00000-5,00000',
      },
      {
        id: 6,
        image: bridew6,
        name: '"Bismillah Lehanga"',
        description: 'Rs 8,000-80,000',
      },
      {
        id: 7,
        image: bridew7,
        name: '"Shehlas Designer Collection"',
        description: 'Rs 5,000-1,00000',
      },
      {
        id: 8,
        image: bridew8,
        name: '"Tul Palav"',
        description: 'Rs 5000-60000 ',
      },
      {
        id: 9,
        image: bridew9,
        name: '"Valley Kart"',
        description: 'Rs 3000- 40,000',
      },
      
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
  Bridal Wear
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default lehangas;
