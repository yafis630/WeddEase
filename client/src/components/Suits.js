import React from 'react';
import CardList from './CardList';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import s4 from '../assets/s4.png';
import s5 from '../assets/s5.png';
import s6 from '../assets/s6.png';
import s7 from '../assets/s7.png';
import s8 from '../assets/s8.png';
import s9 from '../assets/s9.png';
const suits = () => {
  const data = [
    {
      id: 1,
      image: s1,
      name: '"Royal Concept"',
      description: 'Rs 10,000 -70000.',
    },
    {
      id: 2,
      image: s2,
      name: '"Mirs Shop"',
      description: 'Rs 50,000-2,00000',
    },
    {
        id: 3,
        image: s3,
        name: '"Om Enterprises"',
        description: ' Rs 3,000,60,000' ,
      },
     
      {
        id: 4,
        image: s4,
        name: '"Only Bharat Prints Bharat Wedding Plaza Bharat Mens Studio"',
        description: 'RS 5000-8000',
      },
      {
        id: 5,
        image: s5,
        name: '"Sheikh Fajr"',
        description: 'Rs 3,00000-5,00000',
      },
      {
        id: 6,
        image: s6,
        name: '"Bismillah Lehanga"',
        description: 'Rs 8,000-80,000',
      },
      {
        id: 7,
        image: s7,
        name: '"Shehlas Designer Collection"',
        description: 'Rs 5,000-1,00000',
      },
      {
        id: 8,
        image: s8,
        name: '"New Modern Lahanga Shop"',
        description: 'Rs 5000-60000 ',
      },
      {
        id: 9,
        image: s9,
        name: '"Valley Kart"',
        description: 'Rs 3000- 40,000',
      },
      
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
Groom Suits
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default suits;
