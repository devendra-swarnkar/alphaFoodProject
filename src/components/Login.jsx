
import React, { useEffect, useState } from 'react';
import loginSideImage from "../assets/LoginPageSideImage.png";
import AlphLogo from '../assets/alphalogo.png';
import axios from "axios";
import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';




const Login = ({ activeTab }) => {
  const [activeTabitem, setActiveTabitem] = useState('login');
  const [showOTP, setshowOTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState(null);
  const [isOTPVerified, setIsOTPVerified] = useState(false);


  useEffect(() => {
    setActiveTabitem(activeTab ? activeTab : 'login');
  }, [activeTab]);


  const toggletab = (tab) => {
    setActiveTabitem(tab);
    setshowOTP(false);
    setIsOTPVerified(false);
  };


  const sendOTP = async (mobilenumber) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);

    try {
    
      await axios.post("http://localhost:5000/otp", { mobilenumber, otp });
      setGeneratedOTP(otp); // Store the generated OTP in state
      // alert(`OTP sent: ${otp} (For testing, replace with SMS API)`);
      Swal.fire({
        title: 'OTP Sent',
        text: `Please check your phone for the OTP ${otp}`,
        icon: 'success',
      });
      setshowOTP(true);
    } catch (error) {
      console.error("Error sending OTP", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };



 

  const verifyOTP = async (values) => {
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      const  users = response.data;

      const userExists = users.some((user) => user.mobilenumber === values.mobilenumber);
     if(activeTabitem === 'login'){
      if (!userExists) {
        setIsOTPVerified(false);
        toast.info("Mobile number not registered. Please register first.");
        setTimeout(() => {
         
          window.location.reload();
        }, 3000);
        return; 
      }else toast.success("Mobile number exists. Proceeding to verify OTP...");
    }
    else if(activeTabitem === 'Register'){
      if (userExists) {
        setIsOTPVerified(false);
        toast.info("Mobile number is already registered");
        setTimeout(() => {
         
          window.location.reload();
        }, 3000);
        return; 
      }
    }
      if (values.otp === generatedOTP) {


        


        localStorage.setItem("user", JSON.stringify({
           name: values.name,
           mobilenumber: values.mobilenumber,
           email: values.email,
        }));
        console.log(values)

        setIsOTPVerified(true);
        setshowOTP(false);
        setShowPassword(true);

        toast.success("OTP Verified!");

        if(activeTabitem === 'login') {
          toast.success("Login successful!");

        setTimeout(() => {
          console.log("OTP verified, redirecting to home page...");
          
          window.location.reload();
        }, 3000);
        }
      } else {
        toast.error("Invalid OTP! Try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const registerUser = async (values) => {
    if (!isOTPVerified) {
      toast.error("Please verify your OTP first!");
      return;
    }
    try {

     await axios.post("http://localhost:5000/users", {
        mobilenumber: values.mobilenumber,
        name: values.name,
        email: values.email,
        otp: values.otp,
        password: values.password,
        Confirmpassword: values.Confirmpassword,
      });
      window.location.reload();
     

      toast.success("User Registered Successfully!");
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify({
        name: values.name,
        mobilenumber: values.mobilenumber,
        email: values.email,
       
      }));

      // Clear form and reset state
      values({
        mobilenumber: "",
        name: "",
        email: "",
        otp: "",
        password: "",
        Confirmpassword: "",
      });
      setIsOTPVerified(false);
    
    } catch (error) {
      console.error("Error registering user", error);
    }
  };
  
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    mobilenumber: Yup.string()
      .length(10, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    Confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    otp: Yup.string().when("showOTP", {
      is: true,
      then: Yup.string().required("OTP is required"),

    }),
  });


  return (
    <div aria-labelledby="LoginModalLabel">
      <div className="modal-dialog ">
        <div className="modal-content">
          <section className="custom-section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="container d-flex justify-content-center LoginContent">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <img
                          src={AlphLogo}
                          alt="Logo"
                          width="168px"
                          height="40px"
                          className="d-inline-block align-text-top"
                        />
                        <p className="logotext">FOOD PLATINUM</p>
                        <h4 className="loginContentHeader">Welcome Back</h4>
                        <p>Enter your mobile number</p>
                        <div className="LoginContentButton" id="list-home-list" role="tablist">
                          <button
                            type="button"
                            className={`btn nav-item LoginContentButton1 ${activeTabitem === 'login' ? 'active' : ''
                              }`}
                            onClick={() => toggletab('login')}
                          >
                            Login
                          </button>
                          <button
                            type="button"
                            className={`btn nav-item RegisterContentButton1 ${activeTabitem === 'Register' ? 'active' : ''
                              }`}
                            onClick={() => toggletab('Register')}
                          >
                            Register
                          </button>
                        </div>

                        <Formik
                          initialValues={{
                            mobilenumber: "",
                            name: "",
                            email: "",
                            otp: "",
                            password: "",
                            Confirmpassword: "",
                          }}
                          validationSchema={validationSchema}
                          onSubmit={async (values) => {
                            // checkMobileNumber(values.mobilenumber, sendOTP); // Call the checkMobileNumber function on form submission
                            alert(JSON.stringify(values, null, 2));
                          }}
                        >
                          {({ values, errors, touched, handleChange }) => (
                            <Form>
                              <div className="tab-content" id="nav-tabContent">
                                {activeTabitem === 'login' && !showOTP && !isOTPVerified && (
                                  <>

                                    <div className="input-group my-2">
                                      <Field
                                        type="text"
                                        className="form-control loginInputBox fw-lighter"
                                        placeholder="Name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <ErrorMessage className='errorMessage' name="name" component="div" />
                                    <div className="input-group mb-3">
                                      <Field
                                        type="number"
                                        className="form-control loginInputBox fw-lighter my-3"
                                        placeholder="Mobile Number"
                                        name="mobilenumber"
                                        value={values.mobilenumber}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                    <ErrorMessage className='errorMessage' name="mobilenumber" component="div" />
                                    <button
                                      type="button"
                                      className="btn btn-dark LoginSendOTPButton"
                                      onClick={() => sendOTP(values.mobilenumber)}
                                      disabled={!!errors.mobilenumber || !touched.mobilenumber} // Disable if there are errors or the field is not touched


                                    >
                                      Send OTP
                                    </button>
                                  </>
                                )}

                                {showOTP && (
                                  <>
                                    <div className="input-group mb-3">
                                      <Field
                                        type="number"
                                        className="form-control loginInputBox fw-lighter my-3"
                                        placeholder="Enter OTP"
                                        name="otp"
                                        value={values.otp}
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                    <ErrorMessage name="otp" component="div" />

                                    <button
                                      type="button"
                                      className="btn btn-dark LoginSendOTPButton"
                                      onClick={() => verifyOTP(values)}
                                      disabled={!!errors.otp || !touched.otp} // Disable if there are errors or the field is not touched}
                                    >
                                      Verify
                                    </button>
                                  </>
                                )}

                                {activeTabitem === 'Register' && !showOTP && !showPassword && (
                                  <>
                                    <div className="my-3">
                                      <div className="input-group mb-2">
                                        <Field
                                          type="number"
                                          className="form-control loginInputBox fw-lighter"
                                          placeholder="Mobile Number"
                                          name="mobilenumber"
                                          value={values.mobilenumber}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <ErrorMessage className='errorMessage' name="mobilenumber" component="div" />

                                      <div className="input-group mb-2">
                                        <Field
                                          type="text"
                                          className="form-control loginInputBox fw-lighter"
                                          placeholder="Name"
                                          name="name"
                                          value={values.name}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <ErrorMessage className='errorMessage' name="name" component="div" />

                                      <div className="input-group mb-2">
                                        <Field
                                          type="email"
                                          className="form-control loginInputBox fw-lighter"
                                          placeholder="Email"
                                          name="email"
                                          value={values.email}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <ErrorMessage className='errorMessage' name="email" component="div" />
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-dark LoginSendOTPButton"
                                      onClick={() => sendOTP(values.mobilenumber)}
                                      disabled={!!errors.mobilenumber || !touched.mobilenumber || !!errors.email || !touched.email || !!errors.name || !touched.name}
                                    // Disable if there are errors or the field is not touched
                                    >
                                      Send OTP
                                    </button>

                                  </>
                                )}

                                {activeTabitem === 'Register' && showPassword && isOTPVerified && (
                                  <>
                                    <div className="my-3">
                                      <div className="input-group mb-2">
                                        <Field
                                          type="password"
                                          className="form-control loginInputBox fw-lighter"
                                          placeholder="Password"
                                          name="password"
                                          value={values.password}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <ErrorMessage className='errorMessage' name="password" component="div" />

                                      <div className="input-group mb-2">
                                        <Field
                                          type="password"
                                          className="form-control loginInputBox fw-lighter"
                                          placeholder="Confirm Password"
                                          name="Confirmpassword"
                                          value={values.Confirmpassword}
                                          onChange={handleChange}
                                        />
                                      </div>
                                      <ErrorMessage className='errorMessage' name="Confirmpassword" component="div" />
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-dark LoginSendOTPButton"
                                      onClick={() => registerUser(values)}
                                      disabled={!!errors.password || !touched.password || !!errors.Confirmpassword || !touched.Confirmpassword}
                                    >
                                      Register
                                    </button>
                                  </>
                                )}
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <img
                    src={loginSideImage}
                    width={'100%'}
                    height={'100%'}
                    className="p-0 mx-3"
                    alt="Login-Side-Image"
                  />
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
