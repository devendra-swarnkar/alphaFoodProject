import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from "../assets/Profile.png";
import OrderImage from "../assets/Order-logo.png";
import NotificationLogo from "../assets/Notification.png";
import Favorite from "../assets/Favorite.png";
import LocationWhitelogo from "../assets/Location.png";
import TransactionLogo from "../assets/Transaction.png";
import LogoutLogo from "../assets/logout.png";
import OrderProductImage from "../assets/OrderProductImage.png";
import ShipedLogo from "../assets/ShipedLogo.png";
import BigSandwichImage from "../assets/BigSandwich.png";
import CartImage from "../assets/AddtoCart.png";
import StarLogo from "../assets/Star.png";
import LocationRedlogo from "../assets/location-logoInRed.png";
import axios from 'axios';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Slice.jsx'; 
import { toast } from 'react-toastify';


const MyAccount = () => {
    

    const dispatch = useDispatch();
    const [AddAddress, setAddAddress] = useState(false)
    const [AddressList, setAddressList] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(user) {
        fetchAddressList();
        }
    }, [user]);

    const [response, setResponse] = useState({
        id: 1,
        name: "",
        mobilenumber: "",
        alternateNumber: "",
        houseingbuilding: "",
        RoadNameOrColonyName: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        type: "",
    });


    const handleChange = (e) => {
        setResponse({ ...response, [e.target.name]: e.target.value });
    };

    

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);

                try {
                    const response = await axios.get(`http://localhost:5000/users?mobilenumber=${parsedUser.mobilenumber}`);
                    if (response.data.length > 0) {
                        const fullUser = response.data[0];
                        setUser(fullUser);
                        localStorage.setItem('user', JSON.stringify(fullUser));
                    } else {
                        toast.error('User not found. Please log in again.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast.error('Failed to fetch user data. Please try again.');
                }
            }
        };

        fetchUserData();
    }, []);


    const fetchAddressList = async () => {
        if (!user || !user.id) {
            console.error("User ID not found. Cannot fetch address list.");
            return;
          }
        try {
            const response = await axios.get(`http://localhost:5000/AddNewAddress?userId=${user.id}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch address list');
            }
            setAddressList(response.data);
        } catch (error) {
            console.error('Error fetching address list:', error);
            toast.error('Failed to fetch address list. Please try again.');
        }
    }

    const validationSchema = Yup.object({
        mobilenumber: Yup.string()
            .length(10, "Mobile number must be 10 digits")
            .required("Mobile number is required"),
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        oldPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Old password is required"),
        newPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("New password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm password is required"),
    });



    const updateProfile = async (values, { setSubmitting }) => {

        if (!user || !user.id) {
            toast.error("User ID not found. Please log in again.");
            setSubmitting(false);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/users/${user.id}`, {
                name: values.name,
                email: values.email,
                mobilenumber: values.mobilenumber,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            });

            if (response.status === 200) {
                toast.success('Profile updated successfully!');
                const updatedUser = {
                    ...user,
                    name: values.name,
                    email: values.email,
                    mobilenumber: values.mobilenumber,
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };
    if (!user) {
        return <p>Loading user data...</p>;
    }

    const AddNewAddress = async (e) => {
        if (e) e.preventDefault();
        if(!response.name || !response.mobilenumber || !response.houseingbuilding || !response.RoadNameOrColonyName || !response.country || !response.state || !response.city || !response.pincode) {
            toast.error("Please fill all required fields.");
            return;
        }
        try {
            await axios.post(`http://localhost:5000/AddNewAddress`, {
                name: response.name,
                mobilenumber: response.mobilenumber,
                alternateNumber: response.alternateNumber,
                houseingbuilding: response.houseingbuilding,
                RoadNameOrColonyName: response.RoadNameOrColonyName,
                country: response.country,
                state: response.state,
                city: response.city,
                pincode: response.pincode,
                type: response.listGroupRadio,
            });
            toast.success('Address added successfully!');
            setResponse({
                name: "",
                mobilenumber: "",
                alternateNumber: "",
                houseingbuilding: "",
                RoadNameOrColonyName: "",
                country: "",
                state: "",
                city: "",
                pincode: "",
                type: "",
            });

            fetchAddressList();
            setAddAddress(false);
        } catch (error) {
            console.error('Error adding address:', error);
            toast.error('Failed to add address. Please try again.');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("user"); 
        dispatch(logout()); 
        toast.info("You have been logged out!");
        window.location.reload();
      };
    


    return (
        <>
            <section className='custom-section '>
                <div className="container-fluid px-0">
                    <div className="row ContactContent ">
                        <div className='col-lg-12 col-md-12  col-sm-12  col-12 '>
                            <div className="contact-us">Chechout</div>
                            <Link className=' homelink' to="/">Home </Link>
                            <span className='Checkout'>/</span>
                            <Link className='Checkout' > My Account</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className='custom-section'>
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="list-group MyAccountListGroup " id="list-tab" role="tablist">
                                <Link className="list-group-item list-group-item-action active " id="list-profile-list" data-bs-toggle="list" to="#list-profile" role="tab" aria-controls="list-profile"> <img src={ProfileImage} alt="Profile-image" /> Profile Update</Link>
                                <Link className="list-group-item list-group-item-action" id="list-order-list" data-bs-toggle="list" to="#list-order" role="tab" aria-controls="list-order"> <img src={OrderImage} alt="OrderLogo" /> Order</Link>
                                <Link className="list-group-item list-group-item-action" id="list-notification-list" data-bs-toggle="list" to="#list-notification" role="tab" aria-controls="list-notification"> <img src={NotificationLogo} alt="Notification" /> Notification</Link>
                                <Link className="list-group-item list-group-item-action" id="list-favorite-list" data-bs-toggle="list" to="#list-favorite" role="tab" aria-controls="list-favorite"> <img src={Favorite} alt="Favorite" /> Favorite</Link>
                                <Link className="list-group-item list-group-item-action" id="list-address-list" data-bs-toggle="list" to="#list-address" role="tab" aria-controls="list-address"> <img src={LocationWhitelogo} alt="Location-logo" /> Address</Link>
                                <Link className="list-group-item list-group-item-action" id="list-Tansaction-list" data-bs-toggle="list" to="#list-Tansaction" role="tab" aria-controls="list-Tansaction"> <img src={TransactionLogo} alt="Transaction" /> Transaction</Link>
                                <Link onClick={handleLogout}  className="list-group-item list-group-item-action" id="list-logout-list" data-bs-toggle="list" to="#list-logout" role="tab" aria-controls="list-logout"> <img src={LogoutLogo} width={20} height={20} alt="LogoutLogo" /> LogOut</Link>

                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12">

                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">

                                    <Formik
                                        initialValues={{
                                            name: user.name || '',
                                            email: user.email || '',
                                            mobilenumber: user.mobilenumber || '',
                                            oldPassword: '',
                                            newPassword: '',
                                            confirmPassword: '',
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={updateProfile}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <>
                                                    <div className='container-fluid my-5 mx-3'>
                                                        <div className="row">
                                                            <div className='col-lg-6 col-md-6 col-sm-6 col-6 '>
                                                                <div className="input-group mb-3">
                                                                    <Field type="text" className="form-control ProfileInput" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" name="name"
                                                                    />
                                                                    <ErrorMessage className='errorMessage' name="name" component="div" />

                                                                </div>
                                                            </div>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                                <div className="input-group mb-3">
                                                                    <Field type="email" className="form-control ProfileInput" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"
                                                                        name="email"
                                                                    />
                                                                    <ErrorMessage className='errorMessage' name="email" component="div" />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                                <div className="input-group mb-3">
                                                                    <Field type="number" className="form-control ProfileInput" placeholder="Mobile Number" aria-label="MobileNumber" aria-describedby="basic-addon1"
                                                                        name="mobilenumber"
                                                                    />
                                                                    <ErrorMessage className='errorMessage' name="mobilenumber" component="div" />

                                                                </div>
                                                            </div>
                                                            <div className='col-6'></div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                                                <div className="input-group mb-3">
                                                                    <Field type="password" className="form-control ProfileInput" placeholder="Old Password" aria-label="OldPassword" aria-describedby="basic-addon1"
                                                                        name="oldPassword"
                                                                    />
                                                                    <ErrorMessage className='errorMessage' name="oldPassword" component="div" />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                                <div className="input-group mb-3">
                                                                    <Field type="password" className="form-control ProfileInput" placeholder="New Password" aria-label="NewPassword" aria-describedby="basic-addon1"
                                                                        name="newPassword"
                                                                    />
                                                                    <ErrorMessage className='errorMessage' name="newPassword" component="div" />

                                                                </div>
                                                            </div>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                                <div className="input-group mb-3">
                                                                    <Field type="password" className="form-control ProfileInput" placeholder="Confirm Password" aria-label="ConfirmPassword" aria-describedby="basic-addon1"
                                                                        name="confirmPassword"
                                                                    />
                                                                    <ErrorMessage className='errorMessage' name="confirmPassword" component="div" />

                                                                </div>
                                                            </div>
                                                            <button type='submit' className='btn btn-dark ProfileSaveButton mx-2' disabled={isSubmitting}
                                                            >                            {isSubmitting ? 'Saving...' : 'Save'}
                                                            </button>
                                                        </div>
                                                    </div>


                                                </>
                                            </Form>

                                        )}
                                    </Formik>
                                </div>
                                <div className="tab-pane fade" id="list-order" role="tabpanel" aria-labelledby="list-order-list">
                                    <div>
                                        <div className='container-fluid card MyAccountOrderCard'>
                                            <div className='row'>
                                                <div className='col-8'>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <img src={OrderProductImage} alt="Order-Product-Image" className='OrderProductImageInMyAccount' />
                                                        </div>
                                                        <div className='col-6 '>
                                                            <h3 className='MyAccountOrderHeader'>Friy Papad</h3>
                                                            <p className='OrderIDpara'>Order ID- ID2458625</p>
                                                            <button className='btn btn-warning MyAccountOrderCardbutton' disabled >On the way</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-4'>
                                                    <div className='text-end my-3 '>
                                                        <h4 className='OrderPrices'>₹210</h4>
                                                        <p className='OrderIDpara'>Oty - 4</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container-fluid card MyAccountOrderCard'>
                                            <div className='row'>
                                                <div className='col-8'>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <img src={OrderProductImage} alt="Order-Product-Image" className='OrderProductImageInMyAccount' />
                                                        </div>
                                                        <div className='col-6'>
                                                            <h3 className='MyAccountOrderHeader'>Friy Papad</h3>
                                                            <p className='OrderIDpara'>Order ID- ID2458625</p>
                                                            <button className='btn btn-danger MyAccountOrderCardbutton' disabled >Order Cancelled</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-4'>
                                                    <div className='text-end my-3 '>
                                                        <h4 className='OrderPrices'>₹210</h4>
                                                        <p className='OrderIDpara'>Oty - 4</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container-fluid card MyAccountOrderCard'>
                                            <div className='row'>
                                                <div className='col-8'>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <img src={OrderProductImage} alt="Order-Product-Image" className='OrderProductImageInMyAccount' />
                                                        </div>
                                                        <div className='col-6'>
                                                            <h3 className='MyAccountOrderHeader'>Friy Papad</h3>
                                                            <p className='OrderIDpara'>Order ID- ID2458625</p>
                                                            <button className='btn btn-warning MyAccountOrderCardbutton' disabled >On the way</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-4'>
                                                    <div className='text-end my-3 '>
                                                        <h4 className='OrderPrices'>₹210</h4>
                                                        <p className='OrderIDpara'>Oty - 4</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="list-notification" role="tabpanel" aria-labelledby="list-notification-list">
                                    <div className='my-5'>
                                        <div className='container-fluid card NotificationCard'>
                                            <div class="d-flex align-items-center my-2">
                                                <div class="flex-shrink-0">
                                                    <div className='card ShipedCard'>
                                                        <img src={ShipedLogo} alt="Shiped-logo" width={32} height={32} />
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 ms-3 ">
                                                    <h4 className='NotificationCardHeader'>Your order has Been Shipped</h4>
                                                    <p className='NotificationCardpara'>Order ID- ID2458625</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container-fluid card NotificationCard'>
                                            <div class="d-flex align-items-center my-2">
                                                <div class="flex-shrink-0">
                                                    <div className='card ShipedCard'>
                                                        <img src={ShipedLogo} alt="Shiped-logo" width={32} height={32} />
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 ms-3 ">
                                                    <h4 className='NotificationCardHeader'>Your order has Been Shipped</h4>
                                                    <p className='NotificationCardpara'>Order ID- ID2458625</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container-fluid card NotificationCard'>
                                            <div class="d-flex align-items-center my-2">
                                                <div class="flex-shrink-0">
                                                    <div className='card ShipedCard'>
                                                        <img src={ShipedLogo} alt="Shiped-logo" width={32} height={32} />
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 ms-3 ">
                                                    <h4 className='NotificationCardHeader'>Your order has Been Shipped</h4>
                                                    <p className='NotificationCardpara'>Order ID- ID2458625</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container-fluid card NotificationCard'>
                                            <div class="d-flex align-items-center my-2">
                                                <div class="flex-shrink-0">
                                                    <div className='card ShipedCard'>
                                                        <img src={ShipedLogo} alt="Shiped-logo" width={32} height={32} />
                                                    </div>
                                                </div>
                                                <div class="flex-grow-1 ms-3 ">
                                                    <h4 className='NotificationCardHeader'>Your order has Been Shipped</h4>
                                                    <p className='NotificationCardpara'>Order ID- ID2458625</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="list-favorite" role="tabpanel" aria-labelledby="list-favorite-list">
                                    <div className='my-5'>
                                        <div className='container-fluid card favoriteCard'>
                                            <div className='row'>
                                                <div className='col-8'>
                                                    <div class="d-flex align-items-center my-2">
                                                        <div class="flex-shrink-0">
                                                            <img src={BigSandwichImage} alt="BigSandwich" className='BigSandwichImage' />
                                                        </div>
                                                        <div class="flex-grow-1 ms-3 ">
                                                            <h3 className='FavoriteHeader'>Big sandwich</h3>
                                                            <div className='card ratingCard'>
                                                                <p className='ratingCardContent '><img src={StarLogo} alt="StarLogo" />4.3</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-4  OrderPriceContent'>
                                                    <h4 className='OrderPrices'>₹210</h4>
                                                    <button type='button' className='btn btn-outline-danger mx-2 ADDtoCartButtonInFavorite'><img src={CartImage} alt=" Cart-logo" />Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container-fluid card favoriteCard'>
                                            <div className='row'>
                                                <div className='col-8'>
                                                    <div class="d-flex align-items-center my-2">
                                                        <div class="flex-shrink-0">
                                                            <img src={BigSandwichImage} alt="BigSandwich" className='BigSandwichImage' />
                                                        </div>
                                                        <div class="flex-grow-1 ms-3 ">
                                                            <h3 className='FavoriteHeader'>Big sandwich</h3>
                                                            <div className='card ratingCard'>
                                                                <p className='ratingCardContent '><img src={StarLogo} alt="StarLogo" />4.3</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-4 OrderPriceContent'>
                                                    <h4 className='OrderPrices'>₹210</h4>
                                                    <button type='button' className='btn btn-outline-danger mx-2 ADDtoCartButtonInFavorite'><img src={CartImage} alt=" Cart-logo" />Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='container-fluid card favoriteCard'>
                                            <div className='row'>
                                                <div className='col-8'>
                                                    <div class="d-flex align-items-center my-2">
                                                        <div class="flex-shrink-0">
                                                            <img src={BigSandwichImage} alt="BigSandwich" className='BigSandwichImage' />
                                                        </div>
                                                        <div class="flex-grow-1 ms-3 ">
                                                            <h3 className='FavoriteHeader'>Big sandwich</h3>
                                                            <div className='card ratingCard'>
                                                                <p className='ratingCardContent '><img src={StarLogo} alt="StarLogo" />4.3</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-4 OrderPriceContent'>
                                                    <h4 className='OrderPrices'>₹210</h4>
                                                    <button type='button' className='btn btn-outline-danger mx-2 ADDtoCartButtonInFavorite'><img src={CartImage} alt=" Cart-logo" />Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="list-address" role="tabpanel" aria-labelledby="list-address-list">
                                    {
                                        !AddAddress &&
                                        <div>
                                            <div className="card AddAddressHeadCard">
                                                <div className="row ">
                                                    <div className='col'>
                                                        <h5 className='AddAddressCardHeader'><img src={LocationRedlogo} width={24} height={24} alt="Location-RedLogo" />Add New Address</h5>
                                                    </div>
                                                    <div className="col-auto">
                                                        <button type='button' className='btn btn-dark' onClick={() => setAddAddress(true)}>Add New Address</button>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                AddressList.length > 0 ? (
                                                AddressList.map((address) => (
                                                    
                                                      <div key={address.id} className="mx-3">
                                                        <h5 className="AddAddressContantHeader">{address.type}</h5>
                                                        <p className="AddAddressContantpara">
                                                          {address.name} <span className="mx-3">|</span> {address.mobilenumber}
                                                        </p>
                                                        <p className="AddAddressContantpara">
                                                          {address.houseingbuilding}, {address.RoadNameOrColonyName}, {address.city}, {address.state}, {address.country} - {address.pincode}
                                                        </p><hr className="mx-5" />
                                                      </div>
                                                     
                                                ))
                                                ) : (
                                                    <div className='mx-3'>
                                                        <h5 className='AddAddressContantHeader'>No Address Found</h5>
                                                        <p className='AddAddressContantpara'>Please add your address.</p>
                                                    </div>
                                                )


                                            }

                                        </div>
                                    }
                                    {
                                        AddAddress &&
                                        <>
                                            <div className='my-5 mx-3'>
                                                <h5 className='AddAddress'>Add Address</h5>
                                                <div className='container-fluid'>
                                                    <div className='row '>
                                                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                                            <div class="input-group mb-3">
                                                                <input type="text" class="form-control AddressInput" placeholder="Full Name" aria-label="name" aria-describedby="basic-addon1" name='name' onChange={handleChange} required/>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>

                                                            <div class="input-group mb-3">
                                                                <input type="number" class="form-control AddressInput" placeholder="Mobile Number" aria-label="MobileNumber" aria-describedby="basic-addon1" name='mobilenumber' onChange={handleChange} required/>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>

                                                            <div class="input-group mb-3">
                                                                <input type="number" class="form-control AddressInput" placeholder="Alternate Mobile Number" aria-label="AlternateMobileNumber" aria-describedby="basic-addon1" name='alternateNumber' onChange={handleChange} required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row '>
                                                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                                            <div class="input-group mb-3">
                                                                <input type="text" class="form-control AddressInput" placeholder="House no., Building Name" aria-label="HousenoBuildingName" aria-describedby="basic-addon1" name='houseingbuilding' onChange={handleChange} required/>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>

                                                            <div class="input-group mb-3">
                                                                <input type="text" class="form-control AddressInput" placeholder="Road name, Area Colony" aria-label="RoadNameOrColonyName" aria-describedby="basic-addon1" name='RoadNameOrColonyName' onChange={handleChange} required/>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>

                                                            <div class="input-group mb-3">
                                                                <input type="text" class="form-control AddressInput" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1" name='country' onChange={handleChange} required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row '>
                                                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                                            <div class="input-group mb-3">
                                                                <input type="text" class="form-control AddressInput" placeholder="State" aria-label="State" aria-describedby="basic-addon1" name='state' onChange={handleChange} required/>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>

                                                            <div class="input-group mb-3">
                                                                <input type="text" class="form-control AddressInput" placeholder="City" aria-label="City" aria-describedby="basic-addon1" name='city' onChange={handleChange} required />
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>

                                                            <div class="input-group mb-3">
                                                                <input type="number" class="form-control AddressInput" placeholder="Pincode" aria-label="Pincode" aria-describedby="basic-addon1" name='pincode' onChange={handleChange} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h6>Select Delivery type </h6>

                                                        <div class="addressRadioButton">
                                                            <li class="list-group-item">
                                                                <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="home" id="firstRadio" onChange={handleChange}/>
                                                                <label class="form-check-label" for="firstRadio">Home</label>
                                                            </li>
                                                            <li class="list-group-item">
                                                                <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="office" id="secondRadio" onChange={handleChange}  />
                                                                <label class="form-check-label" for="secondRadio">Office</label>
                                                            </li>
                                                            <li class="list-group-item">
                                                                <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="other" id="thirdRadio" onChange={handleChange} />
                                                                <label class="form-check-label" for="thirdRadio">Other</label>
                                                            </li>
                                                        </div>
                                                        <button type='button' className='btn btn-dark my-4 px-4 py-2' onClick={AddNewAddress}>Add Address</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }


                                </div>
                                <div className="tab-pane fade" id="list-Tansaction" role="tabpanel" aria-labelledby="list-Tansaction-list">
                                    <div>
                                        <table className="table my-5 mx-0">
                                            <thead className='TansactionTableCard'>
                                                <tr >
                                                    <th scope="col" className='TansactionTableHeader'>Order ID </th>
                                                    <th scope="col" className='TansactionTableHeader'>Transaction ID </th>
                                                    <th scope="col" className='TansactionTableHeader'>Date & Time</th>
                                                    <th scope="col" className='TansactionTableHeader'>Status</th>
                                                    <th scope="col" className='TansactionTableHeader'>Price</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row" className='TansactionTableContent'>OID52466246325</th>
                                                    <td className='TansactionTableContent'>OID52466246325</td>
                                                    <td className='TansactionTableContent'>2 Oct 2023, 04:45 PM</td>
                                                    <td><button type='button' className='btn btn-success successButtonInTransaction' disabled>success</button></td>
                                                    <td className='TansactionTablePrices'>$2562</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className='TansactionTableContent'>OID52466246325</th>
                                                    <td className='TansactionTableContent'>OID52466246325</td>
                                                    <td className='TansactionTableContent'>2 Oct 2023, 04:45 PM</td>
                                                    <td><button type='button' className='btn  unsuccessfulButtonInTransaction' disabled>unsuccessful</button></td>
                                                    <td className='TansactionTablePrices'>$2562</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className='TansactionTableContent'>OID52466246325</th>
                                                    <td className='TansactionTableContent'>OID52466246325</td>
                                                    <td className='TansactionTableContent'>2 Oct 2023, 04:45 PM</td>
                                                    <td><button type='button' className='btn btn-success successButtonInTransaction' disabled>success</button></td>
                                                    <td className='TansactionTablePrices'>$2562</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className='TansactionTableContent'>OID52466246325</th>
                                                    <td className='TansactionTableContent'>OID52466246325</td>
                                                    <td className='TansactionTableContent'>2 Oct 2023, 04:45 PM</td>
                                                    <td><button type='button' className='btn  unsuccessfulButtonInTransaction' disabled>unsuccessful</button></td>
                                                    <td className='TansactionTablePrices'>$2562</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className='TansactionTableContent'>OID52466246325</th>
                                                    <td className='TansactionTableContent'>OID52466246325</td>
                                                    <td className='TansactionTableContent'>2 Oct 2023, 04:45 PM</td>
                                                    <td><button type='button' className='btn btn-success successButtonInTransaction' disabled>success</button></td>
                                                    <td className='TansactionTablePrices'>$2562</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className='TansactionTableContent'>OID52466246325</th>
                                                    <td className='TansactionTableContent'>OID52466246325</td>
                                                    <td className='TansactionTableContent'>2 Oct 2023, 04:45 PM</td>
                                                    <td><button type='button' className='btn  unsuccessfulButtonInTransaction' disabled>unsuccessful</button></td>
                                                    <td className='TansactionTablePrices'>$2562</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className='TansactionTableContent'>OID52466246325</th>
                                                    <td className='TansactionTableContent'>OID52466246325</td>
                                                    <td className='TansactionTableContent'>2 Oct 2023, 04:45 PM</td>
                                                    <td><button type='button' className='btn btn-success successButtonInTransaction' disabled>success</button></td>
                                                    <td className='TansactionTablePrices'>$2562</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" className='TansactionTableContent'>OID52466246325</th>
                                                    <td className='TansactionTableContent'>OID52466246325</td>
                                                    <td className='TansactionTableContent'>2 Oct 2023, 04:45 PM</td>
                                                    <td><button type='button' className='btn  unsuccessfulButtonInTransaction' disabled>unsuccessful</button></td>
                                                    <td className='TansactionTablePrices'>$2562</td>
                                                </tr>

                                            </tbody>
                                        </table>
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
export default MyAccount