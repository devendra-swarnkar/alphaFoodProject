import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateRestaurant = () => {

    const [userId, setUserId] = useState(null);

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userIdFromLocalStorage = parsedUser ? parsedUser.mobilenumber : null;
    const [user, setUser] = useState(parsedUser);

    console.log("User mobile from localStorage:", userIdFromLocalStorage);




    useEffect(() => {
        const fetchUserData = async () => {
            if (userIdFromLocalStorage) {


                try {
                    const response = await axios.get(`http://localhost:5000/users?mobilenumber=${userIdFromLocalStorage}`);
                    if (response.data.length > 0) {
                        console.log("User data:", response);
                        const userId = response.data[0].id;
                        setUserId(userId);
                        setUser(response.data);

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



    const [response, setResponse] = useState({
        RestaurantName: "",
        RestaurantDescription: "",
        RestaurantImage: "",
        RestaurantCompleteAddress: "",
        RestaurantLocality: "",
        ContactNumberofRestaurant: "",
        LandlineNumberofRestaurant: "",
        RestaurantOwnerName: "",
        RestaurantOwnerEmail: "",
        RestaurantOwnerMobileNumber: "",
    });


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file); // this converts to base64
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
      const [selectedFile, setSelectedFile] = useState(null);

      const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    
        if (file) {
          const base64 = await convertToBase64(file);
          setResponse((prev) => ({
            ...prev,
            RestaurantImage: base64
          }));
        }
      };
      




    const handleChange = (e) => {
        setResponse({ ...response, [e.target.name]: e.target.value });
    };

    const AddRestaurant = async (e) => {
        if (e) e.preventDefault();
        console.log("hello");

        if (!response.RestaurantName || !response.RestaurantCompleteAddress || !response.ContactNumberofRestaurant) {
            // alert("Please fill all required fields.");
            toast.error("Please fill all required fields.");
            return;
        }
        if (!userId) {
            // alert("User ID not found. Please log in first.");
            toast.error("User ID not found. Please log in first.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/AddRestaurant", {
                RestaurantName: response.RestaurantName,
                UserId: userId,
                RestaurantDescription: response.RestaurantDescription,
                RestaurantImage: response.RestaurantImage,
                RestaurantCompleteAddress: response.RestaurantCompleteAddress,
                RestaurantLocality: response.RestaurantLocality,
                ContactNumberofRestaurant: response.ContactNumberofRestaurant,
                LandlineNumberofRestaurant: response.LandlineNumberofRestaurant,
                RestaurantOwnerName: response.RestaurantOwnerName,
                RestaurantOwnerEmail: response.RestaurantOwnerEmail,
                RestaurantOwnerMobileNumber: response.RestaurantOwnerMobileNumber,
            });
            // alert("Restaurant added successfully");
            toast.success("Restaurant added successfully");
            setResponse({
                RestaurantName: "",
                RestaurantDescription: "",
                RestaurantImage: "",
                RestaurantCompleteAddress: "",
                RestaurantLocality: "",
                ContactNumberofRestaurant: "",
                LandlineNumberofRestaurant: "",
                RestaurantOwnerName: "",
                RestaurantOwnerEmail: "",
                RestaurantOwnerMobileNumber: "",

            })
        } catch (error) {
            console.error("Error in adding Restaurant", error);
        }
    };
    


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
                            <Link className='Checkout' > Create Restaurant</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className='custom-section'>
                <div className='container'>
                    <div className='card CreateRestaurantCardfirst my-5'>
                        <div className='text-center py-4 my-2'>
                            <h2 className='CreateRestaurantCardfirstHeader'>Create Your Restaurant Page</h2>
                            <p className='CreateRestaurantCardfirstpara'>Restaurant name, address, contact no., owner details</p>
                        </div>
                        <div className='timeline '>
                            <div className='content bottom'>
                                <h5 className='TimelineContentHeader my-3'>Restaurant Information</h5>
                            </div>
                            <div className='content bottom'>
                                <h5 className='TimelineContentHeader my-3'>Restaurant Type & Timings</h5>
                            </div>
                            <div className='content bottom'>
                                <h5 className='TimelineContentHeader my-3'>Upload Images</h5>
                            </div>
                            <div className='content bottom'>
                                <h5 className='TimelineContentHeader my-3'>Upload Documents</h5>
                            </div>
                            <div className='content bottom'>
                                <h5 className='TimelineContentHeader my-3'>Upload Documents</h5>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='container'>
                    <div className='card CreateRestaurantCardSecondBody '>
                        <h2 className='CreateRestaurantCardSecondHeader'>Restaurant details</h2>
                        <p className='CreateRestaurantCardSecondpara'>Name, address and location</p>
                        <div className="input-group mb-3">
                            <input type="text" name="RestaurantName" className="form-control RestaurantInput" placeholder="Restaurant Name" aria-label="RestaurantName" aria-describedby="basic-addon1" value={response.RestaurantName} onChange={handleChange} required />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control RestaurantInput" placeholder="Restaurant Description" aria-label="RestaurantDescription" aria-describedby="basic-addon1" name='RestaurantDescription' value={response.RestaurantDescription} onChange={handleChange} required />
                        </div>
                        <div className="input-group my-3 ">
                            <input type="file" className="form-control RestaurantInputImage" id="inputGroupFile02"  name='RestaurantImage' onChange={handleFileChange}   />
                            {/* <label className="input-group-text " for="inputGroupFile02" >Upload</label> */}
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control RestaurantInput" placeholder="Restaurant complete address" aria-label="RestaurantCompleteAddress" aria-describedby="basic-addon1" name='RestaurantCompleteAddress' value={response.RestaurantCompleteAddress} onChange={handleChange} required />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control RestaurantInput" placeholder="Enter your restaurant’s locality" aria-label="EnteryourRestaurantlocality" aria-describedby="basic-addon1" name='RestaurantLocality' value={response.RestaurantLocality} onChange={handleChange} required />
                        </div>
                        <div className='container'>
                            <div className='row card ContactUsMap mx-1 my-2'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-12 px-0 py-0'><iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29437.548120835156!2d75.89349105!3d22.739630299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1739362698300!5m2!1sen!2sin"
                                    height="162%"
                                    className='MapheightInRestaurant'
                                    width='100%'
                                    style={{ border: 0, margin: 0, borderRadius: 5 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map"
                                ></iframe></div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control RestaurantInput" placeholder="Latitude" aria-label="Latitude" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control RestaurantInput" placeholder="Longitude" aria-label="Longitude" aria-describedby="basic-addon1" />
                        </div>

                    </div>
                </div>
                <div className='container my-4 '>
                    <div className='card CreateRestaurantCardSecondBody'>
                        <h2 className='CreateRestaurantCardSecondHeader'>Contact number at restaurant</h2>
                        <p className='CreateRestaurantCardSecondpara'>Your customers will call on this number for general enquiries</p>
                        <div className='InputButtonDiv'>
                            <div className="input-group NumberInputDiv ">
                                <span className="input-group-text" id="basic-addon1">+91</span>
                                <input type="number" className="form-control" placeholder="Enter Mobile Number" aria-label="MobileNumber" aria-describedby="basic-addon1" name='ContactNumberofRestaurant' value={response.ContactNumberofRestaurant} onChange={handleChange} required />
                            </div>
                            <button type='button' className='btn btn-dark py-2 px-5 mx-3' >Verify</button>
                        </div>
                        <div>

                            <div className='text-center d-flex align-items-center justify-content-evenly'>
                                <div className='d-flex border-top border-1 border-dark w-25 '> </div>
                                <span className='spanWordInCreateRestauarnt'>
                                    or want to share landline number
                                </span>
                                <div className='d-flex border-1 border-top  border-dark w-25'> </div>
                            </div>
                        </div>
                        <div className="input-group LandlineNumberInput ">
                            <span className="input-group-text" id="basic-addon1">+91</span>
                            <input type="number" className="form-control" placeholder="STD Code |  Landline Number" aria-label="STDCodeORLandlineNumber" aria-describedby="basic-addon1" name='LandlineNumberofRestaurant' value={response.LandlineNumberofRestaurant} onChange={handleChange} required/>
                        </div>
                    </div>
                </div>
                <div className='container my-4 '>
                    <div className='card CreateRestaurantCardSecondBody'>
                        <h2 className='CreateRestaurantCardSecondHeader'>Restaurant owner details</h2>
                        <p className='CreateRestaurantCardSecondpara'>These will be used to share revenue related communications</p>
                        <div className="form-check mx-5">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">
                                <p className='CreateRestaurantCardSecondpara m-0'>Same as restaurant mobile no.</p>
                            </label>
                        </div>
                        <div className='InputButtonDiv'>
                            <div className="input-group NumberInputDiv ">
                                <span className="input-group-text" id="basic-addon1">+91</span>
                                <input type="number" className="form-control" placeholder="Enter Mobile Number" aria-label="MobileNumber" aria-describedby="basic-addon1" name='RestaurantOwnerMobileNumber' value={response.RestaurantOwnerMobileNumber} onChange={handleChange} required />
                            </div>
                            <button type='button' className='btn btn-dark py-2 px-5 mx-3'>Verify</button>
                        </div>

                        <div className="input-group LandlineNumberInput ">
                            <input type="text" className="form-control" placeholder="Restaurant owner full name" aria-label="RestaurantOwnerfullname" aria-describedby="basic-addon1" name='RestaurantOwnerName' value={response.RestaurantOwnerName} onChange={handleChange} required />
                        </div>
                        <div className="input-group LandlineNumberInput ">
                            <input type="email" className="form-control" placeholder="Restaurant owner email address" aria-label="RestaurantOwnerEmailAddress" aria-describedby="basic-addon1" name='RestaurantOwnerEmail' value={response.RestaurantOwnerEmail} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type='button' className='btn btn-dark NextButtonInRestaurant px-5 ' onClick={AddRestaurant} >Add Restaurant</button>
                    </div>
                </div>
            </section>




        </>
    )
}
export default CreateRestaurant;