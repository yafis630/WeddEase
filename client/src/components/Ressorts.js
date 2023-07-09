import React from 'react';
import CardList from './CardList';
import './Categories'
import r0 from '../assets/r0.png'
import r1 from '../assets/r1.png';
import r4 from '../assets/r4.png';
import r5 from '../assets/r5.png';
import r6 from '../assets/r6.png';
import r3 from '../assets/r3.png';


const resorts = () => {
  const data = [
    {
      id: 1,
      image: r1,
      name: '"The Vivanta"',
      description: 'Location:  Kralsangri, Brein, Srinagar. This luxurious hotel overlooks the overlooks the Dal Lake and has a brilliant ambience to cater to your needs. It can accommodate around 800 people in its lawn and banquets.',
    },
    {
      id: 2,
      image: r0,
      name: '"The Lalit Grand Palace"',
      description: 'Location: Gupkar Rd, Srinagar.  This 5-star hotel is a perfect example of royalty with modern amenities.  You also do not have to worry about your guests.The hotel also has three spacious halls to accommodate your guests.      ',
    },
    {
        id: 3,
        image: r4,
        name: '"The Orchard Retreat"',
        description: 'Hazratbal Road, Zukura, Naseem Bagh Srinagar. High-quality food and even spa facilities . Their 1530 sq ft banquet comes with all the modern amenities making it an ideal place to organise your destination wedding in Kashmir.' ,
      },
      {
        id: 4,
        image: r6,
        name: '"The Nigeen Club"',
        description: 'Location: Nigeen lake. It is also one of the best attractive locations in Kashmir for your destination wedding.You can also try to host your special day in the Mughal Gardens with proper permission from the Govt.',
      },
      
      {
        id: 5,
        image: r5,
        name: '"The Hotel Heevan"',
        description: 'Location: Aru Road, Pahalgam. It has a properly equipped banquet hall to cater to your needs. The management gives special attention to details and looks after your guest with utmost care and love. ',
      },
      {
        id: 6,
        image: r3,
        name: '"Khyber Himalayan Spa Resort"',
        description: 'Location: Hotel Khyber Rd, Gulmarg. Baramulla  this luxury hotel is a beautiful venue to organize your big day.It offers world-class facilities and innumerable event spaces. Their food and decoration is also one of the best of the lot..',
      },
      
  ];

  return (
    <div className="page">
        <h1 className='heading '>
     Ressorts
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default resorts;
