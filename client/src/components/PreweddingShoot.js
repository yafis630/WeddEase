import React from 'react';
import CardList from './CardList';
import pw1 from '../assets/pw1.png';
import pw2 from '../assets/pw2.png';
import pw3 from '../assets/pw3.png';
import pw4 from '../assets/pw4.png';
import pw5 from '../assets/pw5.png';
import pw6 from '../assets/pw6.png';
import pw7 from '../assets/pw7.png';
import pw8 from '../assets/pw8.png';
import pw9 from '../assets/pw9.png';
import pw10 from '../assets/pw10.png';
import pw11 from '../assets/pw11.png';
import pw12 from '../assets/pw12.png';


const preweddingShoot = () => {
  const data = [
    {
      id: 1,
      image: pw1,
      name: '"The Wedding Psalm"',
      description: 'Rs 40,000 per day.',
    },
    {
      id: 2,
      image: pw2,
      name: '"The Wedwell by Praveen Rathore"',
      description: 'Rs 30,000 per day',
    },
    {
        id: 3,
        image: pw3,
        name: '"Shutter Time"',
        description: ' Rs 25,000 per day' ,
      },
      {
        id: 4,
        image: pw4,
        name: '"Perx Studio"',
        description: 'Rs 15,000 per day',
      },
      {
        id: 5,
        image: pw5,
        name: '"WedMECLick"',
        description: 'Rs 19000 per day',
      },
      {
        id: 6,
        image: pw6,
        name: '"WEddingEscapes"',
        description: 'Rs 25000 per day',
      },
      {
        id: 7,
        image: pw7,
        name: '"Iglow Studio"',
        description: 'Rs 8000 per day',
      },
      {
        id: 8,
        image: pw8,
        name: '"Focus Wala"',
        description: 'Rs 50000 per day',
      },
      {
        id: 9,
        image: pw9,
        name: '"The unicorn Studio"',
        description: 'Rs 90000 per day',
      },
      {
        id: 10,
        image: pw10,
        name: '"Rolls & Reels "',
        description: 'Rs 80000 per day',
      },
      {
        id: 11,
        image: pw11,
        name: '"Snaps & shots"',
        description: 'Rs 750000 per day',
      },
      {
        id: 12,
        image: pw12,
        name: '"WEva Photography"',
        description: 'Rs 190000 per day',
      },
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
   preweddingShoot
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default preweddingShoot;
