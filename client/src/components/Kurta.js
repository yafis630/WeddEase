import React from 'react';
import CardList from './CardList';
import k1 from '../assets/k1.png';
import k2 from '../assets/k2.png';
import k3 from '../assets/k3.png';
import k4 from '../assets/k4.png';
import k5 from '../assets/k5.png';
import k6 from '../assets/k6.png';

const kurta = () => {
  const data = [
    {
      id: 1,
      image: k1,
      name: '"Royal Concept"',
      description: 'Rs 10,000 -70000.',
    },
    {
      id: 2,
      image: k2,
      name: '"Mirs Shop"',
      description: 'Rs 50,000-2,00000',
    },
    {
        id: 3,
        image: k3,
        name: '"Om Enterprises"',
        description: ' Rs 3,000,60,000' ,
      },
     
      {
        id: 4,
        image: k4,
        name: '"Only Bharat Prints Bharat Wedding Plaza Bharat Mens Studio"',
        description: 'Rs 5000-8000',
      },
      {
        id: 5,
        image: k5,
        name: '"Sheikh Fajr"',
        description: 'Rs 3,00000-5,00000',
      },
      {
        id: 6,
        image: k6,
        name: '"Bismillah Lehanga"',
        description: 'Rs 8,000-80,000',
      },
      
      
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
Kurta Pajamas
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default kurta;
