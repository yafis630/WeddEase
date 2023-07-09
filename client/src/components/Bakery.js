import React from 'react';
import CardList from './CardList';
import bake7 from '../assets/bake7.png';
import bake2 from '../assets/bake2.png';
import bake3 from '../assets/bake3.png';
import bake4 from '../assets/bake4.png';
import bake5 from '../assets/bake5.png';
import bake6 from '../assets/bake6.png';



const bakery = () => {
  const data = [
    {
      id: 1,
      image: bake7,
      name: '"Jee Enn Bakery"',
      description: 'MA Road, Regal Chowk, Munshi Bagh, Srinagar, Jammu and Kashmir 190001 minimum order  starts from Rs 1500',
    },
    {
      id: 2,
      image: bake2,
      name: '"Azaan Bakers"',
      description: 'Rose Lane Entrance, Chanpora, Srinagar, Jammu and Kashmir 190005 minimum order starts from Rs 1200',
    },
    {
        id: 3,
        image: bake3,
        name: '"Cake_heiist"',
        description: ' Kanipora, Srinagar, Jammu and Kashmir 190015 minimum order starts from Rs 2000' ,
      },
      {
        id: 4,
        image: bake4,
        name: '"Moon light The walnut fudge shop"',
        description: ' Airport Rd, Parray Pora, Hyderpora, Srinagar, Jammu and Kashmir 190015 minimum order starts from Rs 600',
      },
      {
        id: 5,
        image: bake5,
        name: '"Nathus Sweets"',
        description: 'Boulevard Rd, Srinagar, Jammu and Kashmir 190001 minimum order starts from Rs 800 ',
      },
      {
        id: 6,
        image: bake6,
        name: '"Hollywood Bakery And Confectionery "',
        description: ' Residency Road, Regal Chowk, Munshi Bagh, Srinagar, Jammu and Kashmir 190001 minimum order starts from Rs 1000',
      },
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
Bakery
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default bakery
