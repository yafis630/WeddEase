import React from 'react';
import CardList from './CardList';
import gold1 from '../assets/gold1.png';
import gold2 from '../assets/gold2.png';
import gold7 from '../assets/gold7.png';
import gold4 from '../assets/gold4.png';
import gold5 from '../assets/gold5.png';
import gold8 from '../assets/gold8.png';

const gold = () => {
  const data = [
    {
      id: 1,
      image: gold1,
      name: '"TAditya Jewellers"',
      description: 'Hari Singh High Street, Srinagar.',
    },
    {
      id: 2,
      image: gold2,
      name: '"Asawir Jewellers"',
      description: 'Sarai Bala, Srinagar',
    },
    {
        id: 3,
        image: gold7,
        name: '"Tanishq"',
        description: ' Polo View, Srinagar' ,
      },
      {
        id: 4,
        image: gold4,
        name: '"Akhoon Jewellers',
        description: 'Nawa Bazar,Srinagar',
      },
      {
        id: 5,
        image: gold5,
        name: '"Gold Souk"',
        description: 'Saraf Kadal, Srinagar',
      },
      {
        id: 6,
        image: gold8,
        name: '"S Khem Singh Seva Singh Jewellers"',
        description: 'Amira Kadal, Srinagar',
      },
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
Gold jewellery
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default gold;
