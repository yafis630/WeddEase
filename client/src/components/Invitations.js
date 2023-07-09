import React from 'react';
import CardList from './CardList';
import wc1 from '../assets/wc1.png';
import wc2 from '../assets/wc2.png';
import wc7 from '../assets/wc7.png';
import wc4 from '../assets/wc4.png';
import wc5 from '../assets/wc5.png';
import wc6 from '../assets/wc6.png';

const invitations= () => {
  const data = [
    {
      id: 1,
      image: wc1,
      name: '"Zahoor Enterprises Wedding Cards"',
      description: 'Zahoor lane Khayam Road , Srinagar, India, Jammu and Kashmir',
    },
    {
      id: 2,
      image: wc2,
      name: '"Wedding Cards Jammu & Kashmir"',
      description: 'We deliver cards to your doorstep.',
    },
    {
        id: 3,
        image: wc7,
        name: '"Imprints Wedding Cards Pvt Ltd"',
        description: ' Raj Bagh , Srinagar' ,
      },
      {
        id: 4,
        image: wc4,
        name: '"Iqbal Printing Press',
        description: 'Silk Factory Road-Srinagar GPO, Srinagar',
      },
      {
        id: 5,
        image: wc5,
        name: '"Dot Matrix"',
        description: 'Wazir Bagh, Srinagar',
      },
      {
        id: 6,
        image: wc6,
        name: '"Sam Enterprises"',
        description: 'Natipora, Jammu & Kashmir, Natipora, Srinagar - 190015',
      },
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
Invitation cards
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default invitations;
