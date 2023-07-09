import React from 'react';
import CardList from './CardList';
import fm1 from '../assets/fm1.png';
import fm2 from '../assets/fm2.png';
import fm3 from '../assets/fm3.png';
import fm4 from '../assets/fm4.png';
import fm5 from '../assets/fm5.png';
import fm6 from '../assets/fm6.png';
const mehandi2 = () => {
  const data = [
    {
      id: 1,
      image: fm1,
      name: '"P. MIRZA MAKEOVER"',
      description: 'Mon - Sun 9:00 am - 8:00 pm Rs 3000 onwards' ,
    },
    {
      id: 2,
      image: fm2,
      name: '"Make over The Buty Spot"',
      description: 'Mon - Sun 9:30 am - 8:00 pm Rs 4000 onwards',
    },
    {
        id: 3,
        image: fm3,
        name: '"Sublime"',
        description: 'Mon - Sun 10:00 am - 9:00 pm Rs 3000 onwards' ,
      },
      {
        id: 4,
        image: fm4,
        name: '"Spray Unisex Beauty Studio."',
        description: 'Mon - Sun 11:00 am - 9:00 pm Rs 3500 onwards',
      },
      {
        id: 5,
        image: fm5,
        name: '"Mehndi By Azmat"',
        description: 'Mon - Sun 10:00 am - 9:00 pm Rs 1000 onwards',
      },
      {
        id: 6,
        image: fm6,
        name: '"He & She Saloon',
        description: 'Mon - Sun 10:00 am - 9:00 pm Rs 1500 onwards',
      },
    ]
  return (
    <div className='page'>
      <h1 className='heading'>
Family Mehandi
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default mehandi2;
