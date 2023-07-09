import React from 'react';
import CardList from './CardList';
import gf1 from '../assets/gf1.png';
import gf2 from '../assets/gf2.png';
import gf3 from '../assets/gf3.png';
import gf4 from '../assets/gf4.png';
import gf5 from '../assets/gf5.png';
import gf6 from '../assets/gf6.png';


const gifts = () => {
  const data = [
    {
      id: 1,
      image: gf1,
      name: '"Goodness of Kashmir Gift Hamper"',
      description: 'starts from Rs 4000.',
    },
    {
      id: 2,
      image: gf2,
      name: '"Ribbons by Samar Shawl"',
      description: 'Starts from  Rs 2000-3000',
    },
    {
        id: 3,
        image: gf3,
        name: '" Gift House"',
        description: ' starts from Rs 500.' ,
      },
      {
        id: 4,
        image: gf4,
        name: '" Wrap A Wrap',
        description: 'starts from Rs 1500',
      },
      {
        id: 5,
        image: gf5,
        name: '"Archies Gallery"',
        description: 'starts from Rs 2500',
      },
      {
        id: 6,
        image: gf6,
        name: '"Red N Roses"',
        description: 'starts  from Rs 600',
      },
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
Gift Hampers
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default gifts;
