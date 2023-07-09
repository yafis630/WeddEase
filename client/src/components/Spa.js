import React from 'react';
import CardList from './CardList';
import './Categories'
import spa1 from '../assets/spa1.png';
import spa2 from '../assets/spa2.png';
import spa7 from '../assets/spa7.png';
import spa4 from '../assets/spa4.png';
import spa8 from '../assets/spa8.png';
import spa6 from '../assets/spa6.png';



const spa = () => {
  const data = [
    {
      id: 1,
      image: spa1,
      name: '"The Khyber"',
      description: 'Location: Hotel Khyber Rd, Gulmarg. Baramulla  this luxury hotel is a beautiful venue to organize your big day.It offers world-class facilities and innumerable event spaces...',
    },
    {
      id: 2,
      image: spa2,
      name: '"The Lalit Grand Palace"',
      description: 'Location: Gupkar Rd, Srinagar.  This 5-star hotel is a perfect example of royalty with modern amenities. ....   ',
    },
    {
        id: 3,
        image: spa7,
        name: '"Radisson Srinagar."',
        description: 'Located 12 kilometers from Sheikh ul-Alam International Airport (SXR). High-quality food and even spa facilities . Their 1530 sq ft banquet comes with all the modern amenities making it an ideal place to organise your destination wedding in Kashmir.' ,
      },
      {
        id: 4,
        image: spa4,
        name: '"Hotel Snow Land Srinagar."',
        description: 'Hotel Snow Land is 4 Star plus Property Located in the heart of the city of Kashmir. Its just 300 meters away from Dal Lake.',
      },
      
      {
        id: 5,
        image: spa8,
        name: '"RK Sarovar Portico"',
        description: 'Gupkar Road, Next to United Nation Base, Sonwar, Srinagar, Jammu & Kashmir - 190001 ',
      },
      {
        id: 6,
        image: spa6,
        name: '"The Chinar Resort & Spa.t"',
        description: 'A luxury resort located in the quieter end of Pahalgam - a beautiful valley of the state of Jammu & Kashmir. Tastefully done modern architecture, interiors and excellent hospitality of the mountains makes the "The Chinar Resort" a perfect place to experience the panoramic beauty and tranquillity of Pahalgam.',
      },
      
  ];

  return (
    <div className="page">
        <h1 className='heading '>
Spa & Wellness
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default spa;
