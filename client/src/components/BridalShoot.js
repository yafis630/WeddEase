import React from 'react';
import CardList from './CardList';
import ph1 from '../assets/ph1.png';
import ph2 from '../assets/ph2.png';
import ph3 from '../assets/ph3.png';
import ph4 from '../assets/ph4.png';
import ph5 from '../assets/ph5.png';
import ph6 from '../assets/ph6.png';
import ph7 from '../assets/ph7.png';
import ph8 from '../assets/ph8.png';
import ph9 from '../assets/ph9.png';
import ph10 from '../assets/ph10.png';
import ph11 from '../assets/ph11.png';
import ph12 from '../assets/ph12.png';


const bridalShoot = () => {
  const data = [
    {
      id: 1,
      image: ph1,
      name: '"The Wedding Psalm"',
      description: '$40,000 per day.',
    },
    {
      id: 2,
      image: ph2,
      name: '"The Wedwell by Praveen Rathore"',
      description: '$30,000 per day',
    },
    {
        id: 3,
        image: ph3,
        name: '"Shutter Time"',
        description: ' $25,000 per day' ,
      },
      {
        id: 4,
        image: ph4,
        name: '"Perx Studio"',
        description: '$15,000 per day',
      },
      {
        id: 5,
        image: ph5,
        name: '"WedMECLick"',
        description: '$19000 per day',
      },
      {
        id: 6,
        image: ph6,
        name: '"WEddingEscapes"',
        description: '$25000 per day',
      },
      {
        id: 7,
        image: ph7,
        name: '"Iglow Studio"',
        description: '$8000 per day',
      },
      {
        id: 8,
        image: ph8,
        name: '"Focus Wala"',
        description: '$50000 per day',
      },
      {
        id: 9,
        image: ph9,
        name: '"The unicorn Studio"',
        description: '$90000 per day',
      },
      {
        id: 10,
        image: ph10,
        name: '"Rolls & Reels "',
        description: '$80000 per day',
      },
      {
        id: 11,
        image: ph11,
        name: '"Snaps & shots"',
        description: '$750000 per day',
      },
      {
        id: 12,
        image: ph12,
        name: '"WEva Photography"',
        description: '$190000 per day',
      },
  ];

  return (
    <div className="page">
      <h1 className='heading' >
   BridalShoot
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default bridalShoot;
