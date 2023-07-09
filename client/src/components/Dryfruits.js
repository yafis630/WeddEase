import React from 'react';
import CardList from './CardList';
import d1 from '../assets/d1.png';
import d2 from '../assets/d2.png';
import d3 from '../assets/d3.png';
import d4 from '../assets/d4.png';
import d5 from '../assets/d5.png';
import d6 from '../assets/d6.png';


const dryfruits = () => {
  const data = [
    {
      id: 1,
      image: d1,
      name: '"Kashmir Dry Fruits Rockishiit"',
      description: 'starting from Rs 800 per box',
    },
    {
      id: 2,
      image: d2,
      name: '"wani dry fruits"',
      description: 'starting from Rs 900 per box',
    },
    {
        id: 3,
        image:d3,
        name: '"Kashmiri Dryfruit Dealer"',
        description: ' starting from Rs 1000 per box' ,
      },
      {
        id: 4,
        image: d4,
        name: '"Kalwal Dry Fruit Company"',
        description: 'starting from Rs 1100 per box',
      },
      {
        id: 5,
        image: d5,
        name: '"Pampori Dry Fruits"',
        description: 'starting from Rs 600 per box',
      },
      {
        id: 6,
        image: d6,
        name: '"THE KASHMIR DRY FRUITS"',
        description: 'starting from Rs 1200 per box',
      },
  ];

  return (
    <div className='page'>
      <h1 className= 'heading'>
 DryFruits
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default dryfruits;
