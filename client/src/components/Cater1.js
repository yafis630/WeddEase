import React from 'react';
import CardList from './CardList';
import '../styles/Categories.css';
import c1 from '../assets/c1.png';
import c2 from '../assets/c2.png';
import c3 from '../assets/c3.png';
import c4 from '../assets/c4.png';
import c5 from '../assets/c5.png';
import c6 from '../assets/c6.png';
const cater1 = () => {
  const data = [
    {
      id: 1,
      image: c1,
      name: '"Ahad Sons"',
      description: ' Rs 1100 Per person .',
    },
    {
      id: 2,
      image: c2,
      name: '"Kashmir Caters"',
      description: ' Rs 1200 Per person .',
    },
    {
        id: 3,
        image: c3,
        name: '"Royal Deccan Catering"',
        description: '  Rs 1000 Per person .' ,
      },
      {
        id: 4,
        image: c4,
        name: '"Banquet d Hospitality Venture"',
        description: ' Rs 800 Per person .',
      },
      {
        id: 5,
        image: c5,
        name: '"KING JI CATERERS"',
        description: '  Rs 900 Per person .',
      },
      {
        id: 6,
        image: c6,
        name: '" Khatir Tawazah Caterers"',
        description: '  Rs 700 Per person .',
      },
      
  ];


  return (
    <div className="page">
      <h1 className='heading '>Catering Services</h1>
      <CardList data={data} />
    </div>
  );
};

export default cater1;
