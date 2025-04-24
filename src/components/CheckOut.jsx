import React from 'react'
import { Link } from 'react-router-dom'
import EditImage from "../assets/Edit.png"
import OrderSummeryImage from "../assets/FriyPapad.png"

const CheckOut = () => {
    return (
        <>
            <section className='custom-section '>
                <div className="container-fluid px-0">
                    <div className="row ContactContent ">
                        <div className='col-lg-12 col-md-12  col-sm-12  col-12 '>
                            <div className="contact-us">Checkout</div>
                            <Link className=' homelink' to="/">Home </Link>
                            <span className='CategorySlash'>/</span>
                            <Link className='CategoryLink'>Category</Link>
                            <span className='Checkout'>/</span>
                            <Link className='Checkout' > Cart</Link>
                            <span className='Checkout'>/</span>
                            <Link className='Checkout' > CheckOut</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className='custom-section'>
                <div className='container'>
                    <div className="row">
                        <div className='col-lg-8 col-md-8 col-sm-8 col-8'>
                            <table class="table my-5">
                                <thead>
                                    <tr>

                                        <th scope="col"><h4 className='CheckoutTableHeader'>Shipping Address</h4></th>
                                        <th scope="col">
                                            <button type='button' className='btn btn-outline-danger editButton'>Edit <img src={EditImage} alt="Edit-logo" /></button>
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>
                                    <tr>
                                        <p className='CheckoutTablepara'>Rajat Matkar
                                            G-17 1st shabari nagar, sukhliya (Indore) indore, near Bandhan Garden INDORE - 452010, Madhya Pradesh
                                            Phone number -9685762333</p>
                                    </tr>
                                    <tr><th scope='col'>
                                        <h4 className='CheckoutTableHeader'>Payment Method</h4>
                                    </th></tr>


                                    <tr>
                                        <td> <input type="radio" id="COD" name="Payment-Method" value="COD" className='radioInputINtable' />
                                            <label for="COD" className='CheckoutTableData mx-3 my-4'>Cash on Delivery</label></td>

                                    </tr>
                                    <tr>
                                        <td> <input type="radio" id="RazorPay" name="Payment-Method" value="RazorPay" className='radioInputINtable' />
                                            <label for="RazorPay" className='CheckoutTableData mx-3 my-4'>RazorPay</label></td>

                                    </tr>
                                    <tr>
                                        <td> <input type="radio" id="UPIPayment" name="Payment-Method" value="UPIPayment" className='radioInputINtable' />
                                            <label for="UPIPayment" className='CheckoutTableData mx-3 my-4'>UPI Payment</label></td>

                                    </tr>
                                    <tr>
                                        <td> <input type="radio" id="Google Pay" name="Payment-Method" value="Google Pay" className='radioInputINtable' />
                                            <label for="Google Pay" className='CheckoutTableData mx-3 my-4'>Google Pay</label></td>

                                    </tr>


                                </tbody>
                            </table>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                            <div className='card  checkoutCard'>

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope='col'>
                                                <h4 className='CheckoutTableHeader my-4 mx-4 '>Order Summary</h4>
                                            </th>
                                            
                                        </tr>
                                        <tr>
                                            <th scope='row'>
                                                <div class="d-flex align-items-center my-2">
                                                    <div class="flex-shrink-0">
                                                        <img src={OrderSummeryImage} alt="OrderImage" width={56} height={56} />
                                                    </div>
                                                    <div class="flex-grow-1 ms-3 ">
                                                        <p className='OrderImageContent my-0'>Friy Papad </p>
                                                        <p className='OrderImageContent my-0'> Qty : 4 </p>
                                                        <p className='OrderImageContent my-0'> 5:5%</p>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className='CheckoutPrices'>₹200</td>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><h5 className='PriceDetail'>Tip your delivery partner</h5>
                                            <p className='PriceHeader my-0'>Your kindness means a lot! 100% of your tip will go
                                                directly to them</p>
                                            <div>
                                                <button type='button' className='btn btn-outline-secondary tipButton '>10</button>
                                                <button type='button' className='btn btn-outline-secondary tipButton'>20</button>
                                                <button type='button' className='btn btn-outline-secondary tipButton'>50</button>

                                            </div></td>
                                            
                                        </tr>
                                        <tr>
                                            <td className='d-flex flex-direction-row gap-2 my-3'>
                                                <div class="input-group input-group-md ">
                                                <input type="text" className="form-control PromoInput" aria-label="Sizing example input" placeholder='Promo Code' aria-describedby="inputGroup-sizing-lg"/>
                                                
                                            </div><button type='button' className='btn btn-dark RedeemButton'>Redeem</button></td>
                                            
                                        </tr>
                                    </tbody>
                                    <thead>

                                        <tr>
                                            <th scope="col" className='PriceDetail'>Price Detail</th>
                                            <th scope="col"></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" className='PriceHeader'> MRP (1 items)</th>
                                            <td className='CartTotalPrices'>₹200</td>

                                        </tr>
                                        <tr>
                                            <th scope="row" className='PriceHeader'>Delivery fee</th>
                                            <td className='CartTotalPrices'>₹20</td>

                                        </tr>
                                        <tr>
                                            <th scope="row" className='PriceHeader'>Discount</th>
                                            <td className='CartTotalPrices'>₹2</td>

                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th className='TotalAmount'>Total Amount</th>
                                            <td className='CartTotalFinalPrice'>₹218</td>
                                        </tr>
                                    </thead>
                                </table>
                                <button type='button' className='btn btn-dark ProceedToBuyButton'>Proceed to buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default CheckOut
