import React from 'react'
import AlphaLogoInWhite from "../assets/AlphaLogoInWhite.png"
import Instagram from "../assets/Instagram.png"
import Youtube from "../assets/Youtube.png"
import WhatsApp from "../assets/WhatApp.png"
import { Link } from 'react-router'
import GooglePlayImage from "../assets/GooglePlay.png"
import AppStoreImage from "../assets/AppleAppStore.png"
import { useSelector } from 'react-redux'


const About = () => {


    const user = useSelector((state) => state.auth.user); // Accessing user data from Redux store

    return (

        <>
            <section className='custom-section overflow-x-hidden AlphaFooter'>
                <div className="container-fluid">
                    <div className="row footerline">
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                            <img src={AlphaLogoInWhite} className='AlphalogoInWhite' alt=" AlphaLogo" />
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                            <div className='followContent'>
                                <h5 className='followheader'>FOLLOW US</h5>
                                <img src={Instagram} alt="Instagram" />
                                <img src={Youtube} alt="Youtube" />
                                <img src={WhatsApp} alt="WhatsApp" />
                            </div>

                        </div>

                    </div>
                </div>
                <div className='container-fluid'>
                    <div className='row footerContent'>
                        <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                            {user ? (
                                <>
                                    <h4 className='footerHeaderContent'> <span className='footerHeaderHighlight'>FO</span>R  RESTAURANTS</h4>
                                    <Link className='footerBottomContent' to="/Partner" > Partner With Us</Link>
                                    <Link className='footerBottomContent' href="/" > Apps For You</Link>
                                    
                                </>
                            ) : (
                                <>
                                </>
                            )}



                            <p>Apps For You</p>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                            <h4 className='footerHeaderContent'> LEARN MORE</h4>
                            <Link className='footerBottomContent' href="/" > Terms & Condition</Link>
                            <Link className='footerBottomContent' href="/" > Privacy Policy</Link>
                            <Link className='footerBottomContent' href="/" > Refund & Cancellation</Link>
                            <Link className='footerBottomContent' href="/" > Return Policies</Link>
                            <Link className='footerBottomContent' href="/" > Shipping Policies</Link>


                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                            <h4 className='footerHeaderContent'> ABOUT ALPHAFOOD</h4>
                            <Link className='footerBottomContent' href="/" > About Us</Link>
                            <Link className='footerBottomContent' to="/ContactUs" > Contact Us</Link>
                            {user ? (
                                <>       
                                  <Link className='footerBottomContent' to="/MyAccount" > My Account</Link>
                                </>
                            ) : (
                                <></>
                            )}


                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-3 col-3 footerLastContent'>
                            <h4 className='footerHeaderContent'> Download Alpha
                                Food Platinum</h4>
                            <div className='AppStore'>
                                <Link href="/"><img src={GooglePlayImage} alt="Google Play" /></Link>
                                <Link href="/"><img src={AppStoreImage} alt="App Store" /></Link>
                            </div>

                        </div>

                    </div>

                </div>
                <div className='copyright '>
                <p className='footerBottomCopyright'>Copyright © 2024, All Right Reserved © Alpha Food Platinum TM Ltd.</p>
            </div>

            </section>
        </>
    )
}
export default About