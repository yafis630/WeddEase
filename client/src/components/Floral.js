import React from 'react';
import CardList from './CardList';
import f1 from '../assets/f1.png';
import f2 from '../assets/f2.png';
import f3 from '../assets/f3.png';
import f4 from '../assets/f4.png';
import f5 from '../assets/f5.png';
import p6 from '../assets/p6.png';


const floral = () => {
  const data = [
    {
      id: 1,
      image: f1,
      name: '"Red N Roses"',
      description: 'starts from Rs 4000.',
    },
    {
      id: 2,
      image: f2,
      name: '"Craft World Kashmir"',
      description: 'Starts from  Rs 2000-3000',
    },
    {
        id: 3,
        image: f3,
        name: '" Crochet and Shimmer"',
        description: ' starts from Rs 500.' ,
      },
      {
        id: 4,
        image: f4,
        name: '" Mir Flowers',
        description: 'starts from Rs 1500',
      },
      {
        id: 5,
        image: f5,
        name: '"GN SHAH"',
        description: 'starts from Rs 2500',
      },
      {
        id: 6,
        image: p6,
        name: '"Be Trendy Be Unique Store"',
        description: 'starts  from Rs 600',
      },
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
Floral jewellery
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default floral;
