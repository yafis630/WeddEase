import React from 'react';
import CardList from './CardList';
import '../styles/Categories.css';
import sing1 from '../assets/sing1.png';
import sing2 from '../assets/sing2.png';
import sing3 from '../assets/sing3.png';
import sing4 from '../assets/sing4.png';
import sing5 from '../assets/sing5.png';
import sing6 from '../assets/sing6.png';



const singer = () => {
  const data = [
    {
      id: 1,
      image: sing1,
      name: '"Sufi singer Noor Mohammad"',
      description: ' $800000 Per day .',
    },
    {
      id: 2,
      image: sing2,
      name: '"Waqar Khan"',
      description: ' $900000 Per day .',
    },
    {
        id: 3,
        image: sing3,
        name: '"Ali Saffudin"',
        description: ' $600000 Per day .' ,
      },
      {
        id: 4,
        image: sing4,
        name: '"Ashfaq Kawa"',
        description: ' $800000 Per day .',
      },
      {
        id: 5,
        image: sing5,
        name: '"Mehmeet Sayeed"',
        description: ' $900000 Per day .',
      },
      {
        id: 6,
        image: sing6,
        name: '" Aabha Hanjura"',
        description: ' $850000 Per day .',
      },
      
  ];


  return (
    <div className="page">
      <h1 className='heading '>Singers</h1>
      <CardList data={data} />
    </div>
  );
};

export default singer;
