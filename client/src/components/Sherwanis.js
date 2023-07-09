import React from 'react';
import CardList from './CardList';
import gw1 from '../assets/gw1.png';
import gw2 from '../assets/gw2.png';
import gw3 from '../assets/gw3.png';
import gw4 from '../assets/gw4.png';
import gw5 from '../assets/gw5.png';
import gw6 from '../assets/gw6.png';
import gw7 from '../assets/gw7.png';
import gw8 from '../assets/gw8.png';
import gw9 from '../assets/gw9.png';
const sherwanis = () => {
  const data = [
    {
      id: 1,
      image: gw1,
      name: '"Royal Concept"',
      description: 'Rs 10,000 -70000.',
    },
    {
      id: 2,
      image: gw2,
      name: '"Mir Lehanga Shop"',
      description: 'Rs 50,000-2,00000',
    },
    {
        id: 3,
        image: gw3,
        name: '"Om Enterprises"',
        description: ' Rs 3,000,60,000' ,
      },
     
      {
        id: 4,
        image: gw4,
        name: '"Only Bharat Prints Bharat Wedding Plaza Bharat Mens Studio"',
        description: 'Rs 5000-8000',
      },
      {
        id: 5,
        image: gw5,
        name: '"Sheikh Fajr"',
        description: 'Rs 3,00000-5,00000',
      },
      {
        id: 6,
        image: gw6,
        name: '"Bismillah Lehanga"',
        description: '$Rs ,8000-80,000',
      },
      {
        id: 7,
        image: gw7,
        name: '"Shehlas Designer Collection"',
        description: '$Rs 10000-1000000',
      },
      {
        id: 8,
        image: gw8,
        name: '"New Modern Lahanga Shop"',
        description: 'Rs 5000-60000 ',
      },
      {
        id: 9,
        image: gw9,
        name: '"Valley Kart"',
        description: 'Rs 3000- 40,000',
      },
      
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
 Sherwanis
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default sherwanis;
