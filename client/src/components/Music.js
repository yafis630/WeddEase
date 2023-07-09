import React from 'react';
import CardList from './CardList';
import '../styles/Categories.css';
import mu1 from '../assets/mu1.png';
import mu2 from '../assets/mu2.png';
import mu3 from '../assets/mu3.png';
import mu4 from '../assets/mu4.png';
import mu5 from '../assets/mu5.png';
import mu6 from '../assets/mu6.png';

const music = () => {
  const data = [
    {
      id: 1,
      image: mu1,
      name: '"Awaaz The Band"',
      description: ' Rs 800000 Per day .',
    },
    {
      id: 2,
      image: mu2,
      name: '"Valley Boyz Rock Drive Band"',
      description: ' Rs 900000 Per day .',
    },
    {
        id: 3,
        image: mu3,
        name: '"Beatz Rock Band"',
        description: ' Rs 600000 Per day .' ,
      },
      {
        id: 4,
        image: mu4,
        name: '"Shehjar"',
        description: ' Rs 800000 Per day .',
      },
      {
        id: 5,
        image: mu5,
        name: '"SARGAM MUSIC"',
        description: ' Rs 900000 Per day .',
      },
      {
        id: 6,
        image: mu6,
        name: '"Oj Kashmir Valley Studio"',
        description: ' Rs 850000 Per day .',
      },
      
  ];


  return (
    <div className="page">
      <h1 className='heading '>Musician</h1>
      <CardList data={data} />
    </div>
  );
};

export default music;
