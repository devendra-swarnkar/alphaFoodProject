import React, { useState } from 'react'
import HomeTemplate from "../assets/HomeTemplate.png"
import BURGER from "../assets/Fresh-beef-burger-isolated.png"
import FrenchFries from "../assets/LargeFries.png"
import PIZZA from "../assets/pizza.png"
import Rolls from "../assets/buritto-with-chicken-french-fries.png"
import BurgerImage from "../assets/BurgerImage.png"
import biscuit from "../assets/BISCUIT.png"
import pizzaImage from "../assets/pizzaImage.png"
import { Link } from 'react-router-dom';


const Home = () => {

  const [items, setItems] = useState([
    { name: "BURGER", image: BURGER, alt: "BURGER" },
    { name: "French Fries", image: FrenchFries, alt: "French Fries" },
    { name: "PIZZA", image: PIZZA, alt: "PIZZA" },
    { name: "Rolls", image: Rolls, alt: "Rolls" },
    { name: "BURGER", image: BURGER, alt: "BURGER" },
    { name: "French Fries", image: FrenchFries, alt: "French Fries" },
  ]);
  
  const handleLeftClick = () => {
    const firstItem = items[0];
    const updatedItems = [...items.slice(1), firstItem]; 
    setItems(updatedItems);
  };

 
  const handleRightClick = () => {
    const lastItem = items[items.length - 1];
    const updatedItems = [lastItem, ...items.slice(0, -1)]; 
    setItems(updatedItems);
  };

  return (
    <>
      <section className='custom-section overflow-x-hidden'>
        <div className='container-fluid p-0'>
          <div className='row '>
            <div className='col-lg-12 col-md-12 col-sm-12 col-12 '>
              <img width="100%" src={HomeTemplate} alt="Template" />
            </div>
          </div>
        </div>
      </section>
      <section className='custom-section overflow-x-hidden'>
        <div className='container-fluid d-flex justify-content-center align-item-center'>
          <div className='row '>
            <div className='col-lg-* col-md-* col-sm-* col-12'>
              <nav aria-label="Page navigation ">
                <ul className="pagination my-2">
                  <li className="page-item">
                    <button class="page-link border-0"  aria-label="Previous" onClick={handleLeftClick}>
                      <span aria-hidden="true" className='Arow'>&lt;</span>
                    </button>
                  </li>
                
                   {items.map((item, index) => (
                 <li className="page-item" key={index}>
                 <Link className="page-link productlist" href="/">
                   <img src={item.image} className='my-2 productImage' alt={item.alt} /> {item.name}
                 </Link>
               </li>
              ))}

                  <li className="page-item">
                    <button className="page-link border-0"  aria-label="Next" onClick={handleRightClick}>
                      <span aria-hidden="true" className='Arow'>&gt;</span>
                    </button>
                  </li>
                </ul>
              </nav>
             
            </div>
          </div>
        </div>
      </section>
      <section className='custom-section overflow-x-hidden'>
        <div className='container-fluid  '>
          <div className='row ContainerContent'>
            <div className='col-lg-4 col-md-4 col-sm-4 col-4 '>
              <div className='contianer-fluid foodProduct1'>
                <div className='row foodProduct1 '>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                    <img src={BurgerImage} className='BurgerImage' alt="BurgerImage" />
                  </div>
                  <div className='col-lg-6 col-md-6 col-6'>
                    <div className='foodProductContent'>
                      <h4 className='productHeaderContent'>TODAY
                        OFFER</h4>
                      <h5 className='percentContent'>20% OFF</h5>
                      <p className='productFooterContent'>NEW PHENOMENAL BURGER TASTE</p>

                    </div>
                  </div>
                </div>
              </div>
            </div>





            <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
              <div className='container-fluid'>
                <div className='row foodProduct3'>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-6'>        
                          <img src={biscuit} className='biscuit' alt="Biscuit" />
                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                  <div className='foodProductContent2'> 
                    <h5 className='productHeaderContent'>OTHER
                    FLAVORS</h5>
                    <p className='percentContentMid'>20% OFF</p>
                    <p className='productFooterContent'>SAVE ROOM
                      WE MADE COOKIES</p></div> </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
              <div className='container-fluid'>
                <div className='row foodProduct2'>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                    <img src={pizzaImage} className='pizzaImage' alt="" /></div>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                    <div className='foodProductContent'> 
                      <h5 className='productHeaderContent'>TODAY
                      OFFER</h5>
                      <p className='percentContent'>20% OFF</p>
                      <p className='productFooterContent'>NEW PHENOMENAL
                        BURGER TASTE</p></div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
      

    </>
  )
}
export default Home
