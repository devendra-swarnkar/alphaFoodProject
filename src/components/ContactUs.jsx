import React from 'react'
import { Link } from 'react-router'
import LocationOutline from "../assets/location-line.png"
import telephoneLogo from "../assets/phone-outline.png"
import MailLogo from "../assets/mail-outline.png"

const ContactUs = () => {
    return (
        <>
            <section className='custom-section '>
                <div className="container-fluid px-0 ">
                    <div className="row ContactContent ">
                        <div className='col-lg-12 col-md-12  col-sm-12  col-12'>
                            <div className="contact-us">Contact Us</div>
                            <Link className=' homelink' to="/">Home </Link>
                            <span className='Checkout'>/</span>
                            <Link className='Checkout' to="/CheckOut" > Checkout</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className='custom-section'>
                <div className="container-fluid my-5">
                    <div className='row'>
                        <div className='col-lg-7 col-md-7 col-sm-12  '>
                            <div className='ContactUsHeaderContent'>
                                <h4 className='ContactUsHeader'>Contact Us</h4>
                                <p className='ContactUsHeaderPara'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                            <div className='container-fluid my-2'>
                                <div className='row'>
                                    <div className='col-lg-3 col-md-3 col-sm-3  col-3 d-flex justify-content-end'>
                                        <div className='OutlineLogoCircle'>
                                            <img className='OutlineLogo' height={24} width={24} src={LocationOutline} alt="Location logo" /></div>
                                    </div>
                                    <div className='col-lg-9 col-md-9 col-sm-9  col-9'><h6 className='ContactUsOutlineLogoHeader'>Address</h6>
                                        <p className='ContactUsOutlineLogoHeaderContent'>Plot Number 152, Ratanlok Colony, Scheme No 53, near Cars 24 showroom,
                                            Vijay Nagar, Indore, Madhya Pradesh 452010</p></div>
                                </div>
                            </div>
                            <div className='container-fluid my-3'>
                                <div className='row'>
                                    <div className='col-lg-3 col-md-3 col-sm-3  col-3 d-flex justify-content-end'>
                                        <div className='OutlineLogoCircle'>
                                            <img className='OutlineLogo' height={24} width={24} src={telephoneLogo} alt="phone logo" /></div>
                                    </div>
                                    <div className='col-lg-9 col-md-9 col-sm-9  col-9 my-3'><h6 className='ContactUsOutlineLogoHeader'>Phone Number</h6> <p className='ContactUsOutlineLogoHeaderContent '>+123-456-7869</p></div>
                                </div>
                            </div>
                            <div className='container-fluid my-3'>
                                <div className='row'>
                                    <div className='col-lg-3 col-md-3 col-sm-3  col-3 d-flex justify-content-end'>
                                        <div className='OutlineLogoCircle'>
                                            <img className='OutlineLogo' height={24} width={24} src={MailLogo} alt="Mail logo" /></div>
                                    </div>
                                    <div className='col-lg-9 col-md-9 col-sm-9 col-9 my-3'><h6 className='ContactUsOutlineLogoHeader' >E-mail</h6> <p className='ContactUsOutlineLogoHeaderContent'>alpha@alphawizz.com</p></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-5 col-md-5 col-sm-12'>
                            <div className='card ContactUsCard'>
                                <h5 className='ContactUsCardHeader'>Contact Us</h5>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control ContactUsInputbox" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control ContactUsInputbox " placeholder="Email Address" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control ContactUsInputbox2 " placeholder="Message" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className='ContactUsCardButtonDiv' >
                                    <button type="button" class="btn btn-dark ContactUsCardButton">Send Message</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='custom-section my-5 mx-3 MapINContactUs'>
                <div className='container'>
                    <div className='row card ContactUsMap'>
                        <div className='col-lg-12 col-md-12 col-sm-12  px-0 py-0 '><iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29437.548120835156!2d75.89349105!3d22.739630299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1739362698300!5m2!1sen!2sin"
                          height="162%"
                           className='ContactUsMapIframe'
                           width='100%'
                            style={{ border: 0, margin:0 , borderRadius:5 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe></div>
                    </div>
                </div>

            </section>
        </>

    )
}
export default ContactUs