import React, { useEffect, useRef, useState } from 'react'
import AlphLogo from '../assets/alphalogo.png'
import Locationlogo from "../assets/Location.png"
import SearchRestaurant from "../assets/Search.png"
import RestaurantLogo from "../assets/Restaurant.png"
import Cart from "../assets/Buy.png"
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import ProfilePic from '../assets/ProfilePic.png'
import axios from 'axios'
import { toast } from 'react-toastify'
// import Restaurants from './Restaurants'



const Navbar = () => {

    const nav = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to track dropdown open/close

    const dropdownRef = useRef(null); // Ref for the dropdown



    // Fetch user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set user data
            setIsLoggedIn(true);  // Mark the user as logged in
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear user data from localStorage
        setUser(null); // Reset user state
        setIsLoggedIn(false); // Mark as logged out
        // alert("You have been logged out!");
        toast.info("You have been logged out!");

       
        
    };

    const handleLoginCheck = async () => {
        if (!user) {
            alert('Please login to continue');
        } else {
            try {
                const res = await axios.get('http://localhost:5000/users');
                if (res.data && res.data.length > 0) {
                    setUser(res.data[0].name);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                alert('Error');
            }
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); // Toggle dropdown state
      };

      useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false); // Close the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div>
            <nav className="navbar bg-body-tertiary position-sticky">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={AlphLogo} alt="Logo" width="168px" height="40px" className="d-inline-block align-text-top" />
                        <p className='logotext'>FOOD PLATINUM</p>
                    </a>
                    <div className="input-group Inputfield">
                        <div className='inputContent'>
                            <img src={Locationlogo} className='my-2 ml-3' width={'24px'} height={'24px'} alt="locationlogo" />
                            <input type="text" className="form-control my-1 border-0" placeholder='Search Location' aria-describedby="inputGroup-sizing-default" />
                            <span className='mx-3 my-2 h5'>|</span>
                            <img src={SearchRestaurant} className='my-2 mx-1' width={'24px'} height={'24px'} alt="Search" />
                            <input type="text" className="form-control my-1 border-0" placeholder='Search for Restaurant' aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                    {
                        isLoggedIn ? (
                            <>
                                <button type="button" className="btn btn-outline-danger AddRestaurantButtonInNavbar mx-2 px-3" onClick={() => nav('/CreateRestaurant')}>
                                    <img src={RestaurantLogo} className='mx-2 my-1' alt="" />Add Restaurant
                                </button>
                                <button type="button" className="btn fw-medium" onClick={() => nav('/Cart')}>
                                    <img src={Cart} alt="Cart" /> Cart
                                </button>
                            </>
                        ) : (
                            <></>
                        )
                    }


                    {isLoggedIn ? (
                        <>
                            <img src={ProfilePic} alt="Profile pic" />
                            <div className="dropdown " ref={dropdownRef}>
                <button
                  className="btn btn-secondary dropdown-toggle m-0 p-2"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded={dropdownOpen} 
                  onClick={toggleDropdown} 
                >
                  {user?.name || "User"} {/* Safely access user.name */}
                </button>
                <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""} `} aria-labelledby="dropdownMenu2">
                  <li>
                    <button className="dropdown-item" type="button">Profile</button>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button" onClick={() => nav('/Restaurants')}>My Restaurants</button>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button" onClick={() => nav('/Saveforlater')}>Save for later</button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item "
                      type="button"
                      onClick={handleLogout }
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>

                        </>
                    ) : (
                        <>
                            <button type="button" className="btn loginButton" data-bs-toggle="modal" data-bs-target="#LoginModal">
                                Login
                            </button>
                            <span>|</span>
                            <button type="button" className="btn loginButton" data-bs-toggle="modal" data-bs-target="#RegisterModal">
                                Register
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Modals */}
            <div id="LoginModal" className="modal modal-lg fade " tabindex="-1">
                <Login activeTab="login" />
            </div>
            <div id="RegisterModal" className="modal modal-lg fade " tabindex="-1">
                <Login activeTab="register" />
            </div>
        </div>


    );
};

export default Navbar;

