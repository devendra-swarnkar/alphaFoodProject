import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Restaurants = () => {

    const [restaurant, setRestaurant] = useState([]);

    const nav = useNavigate();

    useEffect(() => {
        const currentUser = async () => {
            try {
                
                const userData = localStorage.getItem('user');
                   const user = JSON.parse(userData);
                   const mobilenumber = user?.mobilenumber ;
                console.log(mobilenumber)
                if (!mobilenumber) {
                    toast.error("User not found. Please register first.");
                    return;
                }                
                const response = await axios.get(`http://localhost:5000/users`);
                const users = response.data;
                const userId = users.find((user) => user.mobilenumber === mobilenumber)?.id;
                console.log(userId);
                if (!userId) {
                    toast.error("User not found. Please register first.");
                    return;
                    }
               
                const res = await axios.get(`http://localhost:5000/AddRestaurant`);
                const data = res.data;

                console.log(data)
               

                const userRestaurants = data.filter(
                    (item) => item.UserId?.toString() === userId
                );
                setRestaurant(userRestaurants);
                console.log(userRestaurants)
                if (userRestaurants.length === 0) {
                    toast.error("You have not registered any restaurant");
                }
                else {
                    toast.error("User not found. Please register first.");

                }
            } catch (error) {
                console.error(error);
            }
        }
        currentUser();
    }, []);


   

    return (
        <>
            <section className='custom-section '>
                <div className="container-fluid px-0">
                    <div className="row ContactContent ">
                        <div className='col-lg-12 col-md-12  col-sm-12  col-12 '>
                            <div className="contact-us">Create Restaurant</div>
                            <Link className=' homelink' to="/">Home </Link>
                            <span className='Checkout mx-3'>/</span>
                            <Link className='Checkout' to="/Partner" >Partner</Link>
                            <span className='Checkout mx-2'>/</span>
                            <Link className='Checkout' to='/CreateRestaurant' > Create Restaurant</Link>
                            <span className='Checkout mx-2'>/</span>
                            <Link className='Checkout' > My Restaurants</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className='custom-section'>
                <div className="container ">

                    <div className="row" >
                        {restaurant.length > 0 ? (
                            restaurant.map((item, index) => (



                                <div className="col-4 my-3" key={index}>
                                    <div className="card RestaurantCard">
                                        <img
                                            src={item.RestaurantImage}
                                            className="card-img-top RestaurantImageInCard"
                                            alt="Restaurant Logo"
                                        />
                                        <div className="card-body RestaurantCardBody">
                                            <h5 className="card-title"> {item.RestaurantName}</h5>
                                            <p className="card-text RestaurantCardBodyContent ">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>ID:</strong></td>
                                                            <td>{item.id}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Address:</strong></td>
                                                            <td>{item.RestaurantCompleteAddress} </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Restaurant Locality:</strong></td>
                                                            <td>{item.RestaurantLocality} </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Restaurant Contact Number:</strong> </td>
                                                            <td>{item.ContactNumberofRestaurant}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Restaurant landline Number:</strong></td>
                                                            <td>{item.LandlineNumberofRestaurant} </td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Restaurant Owner Name:</strong></td>
                                                            <td>{item.RestaurantOwnerName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Restaurant Owner Email:</strong></td>
                                                            <td>{item.RestaurantOwnerEmail}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Restaurant Owner Mobile Number:</strong></td>
                                                            <td>{item.RestaurantOwnerMobileNumber}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>







                                            </p>
                                            <button className="btn btn-primary m-2" onClick={() => nav(`/AddProduct/${item.id}`)}>Add Products</button>

                                            <button className="btn btn-primary m-2" onClick={() => nav(`/ShowProduct/${item.id}`)}>Show Products</button>

                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p>No Restaurants Found</p>
                            </div>
                        )}
                    </div>



                </div>

            </section>
        </>
    )
}
export default Restaurants;