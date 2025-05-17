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


    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dropdownRef = useRef(null); // Ref for the dropdown

    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]); // Hide dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);




   
    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/AddRestaurant?RestaurantName_like=${query}`);
            setSearchResults(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            toast.error('Failed to fetch restaurants. Please try again.');
        }
    };


    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== '') {
            nav('/', { state: { searchQuery } }); // Pass search query to Home page
            setSearchQuery(''); // Clear the search input
            setSearchResults([]); // Clear the dropdown
        }
    };

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
        <>
            <nav className="navbar bg-body-tertiary position-sticky">
                <div className="container-fluid">
                    <a className="navbar-brand NavbarLogoInWebsite" href="/">
                        <img src={AlphLogo} alt="Logo" width="168px" height="40px" className="d-inline-block align-text-top NavbarAlphaLogo" />
                        <p className='logotext'>FOOD PLATINUM</p>
                    </a>
                   
                    <div className="input-group Inputfield position-relative" ref={searchRef}>
                        <div className="inputContent d-flex align-items-center w-100">
                            <img src={Locationlogo} className="my-2 ml-3" width="24px" height="24px" alt="locationlogo" />
                            <input
                                type="text"
                                className="form-control my-1 border-0"
                                placeholder="Search Location"
                                aria-describedby="inputGroup-sizing-default"
                            />
                            <span className="mx-3 my-2 h5">|</span>
                            <img src={SearchRestaurant} className="my-2 mx-1" width="24px" height="24px" alt="Search" />

                            {/* Search for restaurant input */}
                            <div className="w-100 position-relative">
                                <input
                                    type="text"
                                    className="form-control my-1 border-0"
                                    placeholder="Search for Restaurant"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                                    aria-describedby="inputGroup-sizing-default"
                                />

                                {searchQuery && searchResults.length > 0 && (
                                    <div className="search-results position-absolute bg-white shadow border rounded w-100 z-3 mt-1">
                                        {searchResults.map((restaurant) => (
                                            <div
                                                key={restaurant.id}
                                                className="search-result-item px-3 py-2 border-bottom"
                                                onClick={() => {
                                                    nav('/', { state: { searchQuery: restaurant.RestaurantName } }); // Pass restaurant name to Home page
                                                    setSearchQuery(''); // Clear the search input
                                                    setSearchResults([]); // Clear the dropdown
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {restaurant.RestaurantName}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    {
                        isLoggedIn ? (
                            <>
                                <button type="button" className="btn btn-outline-danger AddRestaurantButtonInNavbar mx-2 px-3 hide-on-mobile" onClick={() => nav('/CreateRestaurant')}>
                                    <img src={RestaurantLogo} className='mx-2 my-1' alt="" />Add Restaurant
                                </button>
                                <button type="button" className="btn fw-medium hide-on-mobile" onClick={() => nav('/Cart')}>
                                    <img src={Cart} alt="Cart" /> Cart
                                </button>
                            </>
                        ) : (
                            <></>
                        )
                    }


                    {isLoggedIn ? (
                        <>
                           <div className='loginContentInNavbar d-flex flex-direction-row'>
                            <img src={ProfilePic} alt="Profile pic" className='profilePicInNavbar'/>
                            <div className="dropdown" ref={dropdownRef}>
                                <button
                                    className="btn btn-secondary dropdown-toggle m-0 "
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
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
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

        </>


    );
};

export default Navbar;

