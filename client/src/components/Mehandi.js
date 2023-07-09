import React from 'react';
import CardList from './CardList';
import a from '../assets/a.png';
import n from '../assets/n.png';
import c from '../assets/c.png';
import d from '../assets/d.png';
import e from '../assets/e.png';
import m from '../assets/m.png';
import g from '../assets/g.png';
import h from '../assets/h.png';
import i from '../assets/i.png';
import j from '../assets/j.png';
import k from '../assets/k.png';



const mehandi = () => {
  const data = [
    {
      id: 1,
      image: a,
      name: '"P. MIRZA MAKEOVER"',
      description: 'Mon - Sun 9:00 am - 8:00 pm Rs 3000 onwards' ,
    },
    {
      id: 2,
      image: n,
      name: '"Make over The Buty Spot"',
      description: 'Mon - Sun 9:30 am - 8:00 pm Rs 4000 onwards',
    },
    {
        id: 3,
        image: c,
        name: '"Sublime"',
        description: 'Mon - Sun 10:00 am - 9:00 pm Rs 3000 onwards' ,
      },
      {
        id: 4,
        image: d,
        name: '"Spray Unisex Beauty Studio."',
        description: 'Mon - Sun 11:00 am - 9:00 pm Rs 3500 onwards',
      },
      {
        id: 5,
        image: e,
        name: '"Mehndi By Azmat"',
        description: 'Mon - Sun 10:00 am - 9:00 pm Rs 1000 onwards',
      },
      {
        id: 6,
        image: m,
        name: '"He & She Saloon',
        description: 'Mon - Sun 10:00 am - 9:00 pm Rs 1500 onwards',
      },
      {
        id: 7,
        image: k,
        name: '"Snipz & Curls"',
        description: 'Mon - Sun 9:00 am - 6:00 pm Rs 3000 onwards',
      },
      {
        id: 8,
        image: g,
        name: '"Mirar"',
        description: 'Mon - Sun 9:00 am - 9:00 pm Rs 3000 onwards',
      },
      {
        id: 9,
        image: h,
        name: '"Arvind Mehandi Art"',
        description: 'Mon - Sun 9:00 am - 10:00 pm Rs 5000 onwards',
      },
      {
        id: 10,
        image: i,
        name: '"ROhit Mehandi Artist "',
        description: 'Mon - Sun 9:30 am - 9:00 pm Rs 1500 onwards',
      },
      {
        id: 11,
        image: j,
        name: '"Kamal Mehandi Artist"',
        description: 'Mon - Sun 10:00 am - 9:00 pm Rs 1000 onwards',
      },
      {
        id: 12,
        image: k,
        name: '"Yogesh Mehandi Artist"',
        description: 'Mon - Sun 10:00 am - 9:00 pm Rs 3000 onwards',
      },
  ];

  return (
    <div className='page'>
      <h1 className='heading'>
  Bridal Mehandi
      </h1>
      <CardList data={data} />
    </div>
  );
};

export default mehandi;
