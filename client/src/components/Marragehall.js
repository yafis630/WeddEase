import React from 'react';
import CardList from './CardList';
import '../styles/Categories.css';
import plan1 from '../assets/plan1.png';
import plan2 from '../assets/plan2.png';
import plan3 from '../assets/plan3.png';
import plan4 from '../assets/plan4.png';
import plan5 from '../assets/plan5.png';
import plan6 from '../assets/plan6.png';
import plan7 from '../assets/plan7.png';
import plan8 from '../assets/plan8.png';
import plan9 from '../assets/plan9.png';
import plan10 from '../assets/plan10.png';
import plan11 from '../assets/plan11.png';
import plan12 from '../assets/plan12.png';


const marragehall = () => {
  const data = [
    {
      id: 1,
      image: plan1,
      name: '"khandar Studio"',
      description: 'Rainawari , starts from Rs 100000-1100000 .',
    },
    {
      id: 2,
      image: plan2,
      name: '"Zool Production"',
      description: 'Rawalpora , starts from Rs 110000-1700000',
    },
    {
        id: 3,
        image: plan3,
        name: '"Izzban Events"',
        description: 'Alochi Bagh ,starts from Rs 70000-1800000' ,
      },
      {
        id: 4,
        image: plan4,
        name: '"Banquet d Hospitality Venture"',
        description: 'Chanapora, starts from Rs 180000-2300000',
      },
      {
        id: 5,
        image: plan5,
        name: '"SR events"',
        description: 'Solina starts from Rs 200000-35000000',
      },
      {
        id: 6,
        image: plan6,
        name: '"EventGrid"',
        description: 'Soura starts from Rs 120000-29000000',
      },
      {
        id: 7,
        image: plan7,
        name: '"GREENATH Kashmir Event Planner"',
        description: 'Lalbazar stars from Rs 55000-1200000',
      },
      {
        id: 8,
        image: plan8,
        name: '"Royal Kashmir"',
        description: 'Magarmal Bagh starts from Rs 34000-6700000',
      },
      {
        id: 9,
        image: plan9,
        name: '"My Wish Event Management"',
        description: 'SheerPora starts from Rs 190000-450000000',
      },
      {
        id: 10,
        image: plan10,
        name: '"Bright Star "',
        description: 'Hamdaniya Colony Bemina starts from Rs 340000-9700000',
      },
      {
        id: 11,
        image: plan11,
        name: '"Atlas Event Management"',
        description: 'Wazir Bagh starts from Rs 10000-700000',
      },
      {
        id: 12,
        image: plan12,
        name: '"MG Wedding Cinematography"',
        description: 'Sanatnagar starts from Rs 340000-7800000',
      },
  ];


  return (
    <div className="page">
      <h1 className='heading '>Destination Wedding Venues</h1>
      <CardList data={data} />
    </div>
  );
};

export default marragehall;
