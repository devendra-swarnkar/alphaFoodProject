import React from 'react'
import partnerCook from "../assets/female-cook.png"
import WriteLogo from "../assets/WriteLogo.png"
import LocationLogoRed from "../assets/location-logoInRed.png"
import RestaurantRedLogo from "../assets/RestaurantLogoRed.png"
import OrderRedLogo from "../assets/OrderLogoInRed.png"
import PartnerDOClogo from "../assets/PartnerDocLogo.png"
import deliveryBikeLogo from "../assets/deliveryBikeLogo.png"
import OrderWhiteLogo from "../assets/PartnerOrderLogo.png"
import { useNavigate } from 'react-router-dom'

const Partner = () => {
    const nav = useNavigate();
    return (
        <>
               <section className='custom-section'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                            <div className='partnerContent my-2'>
                                <h3 className='partnerHeader' >Partner with us
                                    at 0% commission for the 1st month!</h3>
                                <p className='partnerPara'>And get ads worth INR 1500. Valid for new restaurant partners in select cities.</p>
                                <button type='button' className='btn btn-dark PartnerRegisterButton' onClick={()=> nav('/CreateRestaurant')}>Register your restaraunt</button>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6 partnerBG'>
                            <img src={partnerCook} alt="Female-cook" className='femaleCook' />
                        </div>
                    </div>
                </div>
                <div className='container card partnerCard'>
                    <div className='row'>
                        <div className='col-lg-4 col-md-4 col-sm-12 '>
                            <div className='my-5 mx-0'>
                                <h4 className='partnerCardHeader'>Get started with
                                    online ordering</h4>
                                <p className='partnerCardPara'>Please keep the documents ready for a
                                    smooth signup</p></div>

                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12 my-2 '>
                            <p className='LicenseContent'><img src={WriteLogo} alt="Write-logo" className='mx-2' />FSSAI license copy</p>
                            <p className='LicenseContent'><img src={WriteLogo} alt="Write-logo" className='mx-2' />Your restaurant menu</p>
                            <p className='LicenseContent'><img src={WriteLogo} alt="Write-logo" className='mx-2' />Bank account details</p>


                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12  my-2'>
                            <p className='LicenseContent'><img src={WriteLogo} alt="Write-logo" className='mx-2' />Regular GSTIN (if applicable)</p>
                            <p className='LicenseContent'><img src={WriteLogo} alt="Write-logo" className='mx-2' />PAN card copy</p>
                            <p className='LicenseContent'><img src={WriteLogo} alt="Write-logo" className='mx-2' />Dish images for top 5 items</p>

                        </div>
                    </div>
                </div>
            </section>

              <section className='custom-section partnerSection2'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                                <div className='PartnerSecondSection'>
                                    <h1 className='partnerSecondHeader'>Why should you partner with <br />
                                        Jetsetter India ?</h1>
                                    <p className='partnerSecondpara'>Jetsetter India enables you to get 60% more revenue, 10x new customers and boost your brandvisibility by providing insights to improve your business</p>
                                  </div> 
                                </div>
                        </div>
                    </div>
            
       
                <div className='container'>
                    <div className='row '>
                        <div className='col-lg-4 col-md-4 col-sm-12 '>
                            <div className='card partnerThirdCard'>
                                <div className='partnerThirdCardContent'>
                                    <img src={LocationLogoRed} alt=" location" className='partnerThirdContentImage1 ' />
                                   <p className="my-3">1000+ cities in India</p>
                                     </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                            <div className='card partnerThirdCard'>
                                <div className='partnerThirdCardContent'><img src={RestaurantRedLogo} alt=" location" className='partnerThirdContentImage2 ' />
                               <p>3 lakh+ restaurant listings</p> 
                                </div>
                            </div>
                        </div>  
                        <div  className='col-lg-4 col-md-4 col-sm-12'>
                                 <div className='card partnerThirdCard'>
                                           <div className='partnerThirdCardContent'>
                                       <img src={OrderRedLogo} alt=" location" className='partnerThirdContentImage3 ' />
                                       <p className='my-3'> 5.0 crore+ monthl orders</p>
                                           </div>
                                  </div>
                         </div>  
  
                    </div>
                </div>  
            </section >
            <section className='custom-section'>
                <div className='container my-5'>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center '>
                            <h4 className='partnerSectionThirdHeader'>How it works</h4>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-4 col-md-4 col-sm-12 '>
                            <div className='card partnerFourthCard'>
                                <img src={PartnerDOClogo} alt="Partner-Doc-logo" className='partnerFourthCardImage ' />
                            </div>
                            <div className='text-center'>
                                <h5 className='partnerfourthSteps'>Step 1</h5>
                                <p className='partnerFourthStepsContent'> Create your page on Jetsetter India</p>
                                <p>Help users discover your place by 
                                creating a listing on Jetsetter India</p>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                        <div className='card partnerFourthCardSecond'>
                                <img src={deliveryBikeLogo} alt="Delivery-bike-logo" className='partnerFourthCardImage ' />
                            </div>
                            <div className='text-center'>
                                <h5 className='partnerfourthSteps'>Step 2</h5>
                                <p className='partnerFourthStepsContent'> Register for online ordering</p>
                                <p>And deliver orders to millions of 
                                customers with ease</p>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                        <div className='card partnerFourthCard'>
                                <img src={OrderWhiteLogo} alt="Order-white-logo" className='partnerFourthCardImage ' />
                            </div>
                            <div className='text-center'>
                                <h5 className='partnerfourthSteps'>Step 3</h5>
                                <p className='partnerFourthStepsContent'> Start receiving orders online</p>
                                <p>Manage orders on our partner app, 
                                web dashboard or API partners</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
            
        
       
    
  )
}  
export default Partner