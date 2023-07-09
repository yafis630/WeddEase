import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Categories.css';
import './Marragehall';
import './Ressorts';
import  './BridalShoot';
import './PreweddingShoot';
import './NonVeg';
import './Dryfruits';
import './Bakery';
import './Lehangas';
import './Gowns';
import './Singers';
import './Music';
import './Sherwanis';
import './Suits';
import './Mehandi'
import './Mehandi2'
import './Kurta';
import './Makeup';
import './Makeup2';
import './Gold';
import './Floral';
import './Invitations';
import './Spa';
import './Floral';
import './Cater1';
import './Gifts';



const Categories = () => {
  const [activeOption, setActiveOption] = useState(null);

  const handleOptionClick = (index) => {
    if (index === activeOption) {
      setActiveOption(null);
    } else {
      setActiveOption(index);
    }
  };
  return (

    <div className="categories">
      
      <h1>Categories</h1>
      <div className="menu">
        <div className="menu-options">
          {menuOptions.map((option, index) => (
            <div
              key={index}
              className={`option ${activeOption === index ? 'active' : ''}`}
              onClick={() => handleOptionClick(index)}
            >
              
              <span>{option.label}</span>
              {activeOption !== index && (
                <img src={option.image} alt="Menu Icon" className="menu-icon" />
              )}
              {activeOption === index && (
                <div
                  className="menu-background"
                  style={{ backgroundImage: `url(${option.image})` }}
                ></div>
              )}
              {activeOption === index && (
                <div className="sub-menu-options">
                  {option.subOptions.map((subOptions, subIndex) => (
                    <Link
                      key={subIndex}
                      className="sub-option"
                     to= {subOptions.link}
                    >
                     {subOptions.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const menuOptions = [
  {
    label: 'Venues',
    image: 'https://image.wedmegood.com/resized/450X/uploads/member/3265474/1660804521_image875.jpg?crop=3,381,1432,805',
    subOptions: [
      { label: 'MarrageHall', link: '/marragehall' },
      { label: 'Ressort', link: '/ressorts' },
     
    ],
  },
  {
    label: 'Photography',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/2/photographers.jpg',
    subOptions: [
      { label: 'BridalShoot', link: '/bridalshoot' },
      { label: 'Preweddinshoot', link: '/preweddingshoot' },
    ],
  },
  {
    label: 'Food',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/8/food.jpg',
    subOptions: [
      { label: 'Veg/NonVeg', link: '/nonveg' },
      { label: 'Dryfruits', link: '/dryfruits' },
      { label: 'Bakery', link: '/bakery' },
     
    ],
  },
  {
    label: 'Bridal Wear',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/4/bridal-wear.jpg',
    subOptions: [
      { label: 'Lehangas', link: '/lehangas' },
      { label: 'Gowns', link: '/gowns' },

    ],
  },
  {
    label: 'Groom Wear',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/5/groom-wear.jpg',
    subOptions: [
      { label: 'Sherwanis', link: '/sherwanis' },
      { label: 'Suits', link: '/suits' },
      { label: 'Kurta Pajamas', link: '/kurta' },
     
    ],
  },
  {
    label: 'Makeup',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/3/makeup.jpg',
    subOptions: [
      { label: 'Bridal Makeup', link: '/Makeup' },
      { label: 'Family MakeUp', link: '/Makeup2' },
    ],
  },

  {
    label: 'Mehandi',
    image: 'https://www.flickonclick.com/wp-content/uploads/2022/12/Top-10-Bridal-Mehndi-Designs-for-This-Wedding-Season.jpg',
    subOptions: [
      { label: 'Bridal Mehandi', link: '/Mehandi' },
      { label: 'Family Mehandi', link: '/Mehandi2' },
    ],
  },
  
  
  {
    label: 'Jewellery & Accessories',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/11/jewellaries-accessories.jpg',
    subOptions: [
      { label: 'Gold', link: '/gold' },
      { label: 'Floral jewellery', link: '/floral' },
    ],
  },
  {
    label: 'Musician and singers',
    image: 'https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/10/music-dance.jpg',
    subOptions: [
      { label: 'Singers', link: '/singers' },
      { label: 'Musician', link: '/music' }
    ],
  },
  {
    label: 'Invites & Gifts',
    image: 'https://image.wedmegood.com/resized-nw/1300X/wp-content/uploads/2020/02/IMG_5271.jpeg',
    subOptions: [
      { label: 'Invitation Cards', link: '/invitations' },
      { label: 'Gift Hampers', link: '/Gifts' },
     
    ],
  },
 
  {
    label: 'Spa & Wellness',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/9OwZHq0CD8zs4pzRUcikCw/o.jpg',
    subOptions: [
      { label: 'Spa & Wellness', link: '/Spa' },
     
    ],
  },
  {
    label: 'Catering Services',
    image: 'https://theclubmumbai.com/wp-content/uploads/2019/09/j009-2.jpg',
    subOptions: [
      { label: 'Food caters/Tea Caters', link: '/cater1' }
     
    ],
  },

];

export default Categories;