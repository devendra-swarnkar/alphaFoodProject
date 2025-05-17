import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteLogo from "../assets/Delete.png";
import { toast } from 'react-toastify';
import axios from 'axios';



 const Saveforlater = () => {


   const [showSavedProduct, setShowSavedProduct] = useState([]);

   const fetchSavedProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/saveforlater`);
            setShowSavedProduct(response.data.map(item => ({ ...item, quantity: item.quantity || 1 })));

        } catch (error) {
            console.error('Error fetching saved products:', error);
            toast.error('Failed to fetch saved products. Please try again.');
        }

    };

    useEffect(() => {
        fetchSavedProducts();
    }, []);

    

    const handleDelete = async (id) => {
        console.log("Deleting item with ID:", id);
        try {
            await axios.delete(`http://localhost:5000/saveforlater/${id}`);
            toast.success("Product removed from save for later successfully!");
    
            fetchSavedProducts();
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to remove product from save for later. Please try again.");
        }
    };

    const handleQuantityChange = (id, type) => {
        setShowSavedProduct(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
                    }
                    : item
            )
        );
    };

    const TAX_RATE = 0.05; // Define a 5% tax rate


    const totalMRP = showSavedProduct.reduce((sum, item) => {
        const priceWithTax = Number(item.ProductPrice) * (1 + TAX_RATE);
        return sum + priceWithTax * item.quantity;
    }, 0);
    const deliveryFee = 20;
    const discount = 2;
    const totalAmount = totalMRP + deliveryFee - discount;
  
  return (
    <>
      <section className='custom-section'>
                <div className="container-fluid px-0">
                    <div className="row ContactContent">
                        <div className='col-12'>
                            <div className="contact-us">Save For Later</div>
                            <Link className='homelink' to="/">Home</Link>
                            <span className='Checkout'>/</span>
                            <Link className='Checkout'>Save for later</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className='custom-section'>
                <div className='container'>
                    <div className="row">
                        <div className='col-lg-8 col-md-8 col-sm-12 col-12'>
                            <table className="table my-5">
                                <thead>
                                    <tr>
                                        <th className='CartTableHeader'>Image</th>
                                        <th className='CartTableHeader'>Product</th>
                                        <th className='CartTableHeader'>Price</th>
                                        <th className='CartTableHeader'>Tax(%)</th>
                                        <th className='CartTableHeader'>Quantity</th>
                                        <th className='CartTableHeader'>Subtotal</th>
                                        <th className='CartTableHeader'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showSavedProduct.length > 0 ? (
                                        showSavedProduct.map((item) => (
                                            
                                            
                                            <tr key={item.id}>
                                                <td><img width={80} height={80} className='rounded-4 ProductImageInCart' src={item.ProductImage} alt="product" /></td>
                                                <td>
                                                    <p className='ProductInCartSize'>{item.ProductName}</p>
                                                </td>
                                                <td><p className='ProductInCartSize'>₹ {item.ProductPrice}</p></td>

                                                <td><p className='ProductInCartSize'>5%</p></td>
                                                <td>
                                                    <div className='card spinButtonInTable'>
                                                        <button type='button' className='btn spinInnerButton' onClick={() => handleQuantityChange(item.id, 'dec')}>-</button>
                                                        <span className='spinNumber'>{item.quantity}</span>
                                                        <button type='button' className='btn spinInnerButton' onClick={() => handleQuantityChange(item.id, 'inc')}>+</button>
                                                    </div>

                                                </td>
                                                <td>
                                                <p className='ProductInCartSize'>₹ {Number(item.ProductPrice) * (1 + TAX_RATE) * item.quantity}</p>

                                                </td>
                                                <td>
                                                    <button type='button' className='btn'  onClick={() => handleDelete(item.id)} >
                                                        <img src={DeleteLogo} alt="Delete-logo" />
                                                    </button>
                                                   
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className='text-center'>No products available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className='col-lg-4 col-md-12 col-sm-12 '>
                            <div className='card CardCartTotal mx-0'>
                                <h4 className='CartTotal'>Cart Total</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className='PriceDetail'>Price Detail</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className='PriceHeader'>MRP ({showSavedProduct.length} items)</th>
                                            <td className='CartTotalPrices'>₹ {totalMRP}</td>
                                        </tr>
                                        <tr>
                                            <th className='PriceHeader'>Delivery fee</th>
                                            <td className='CartTotalPrices'>₹ {deliveryFee}</td>
                                        </tr>
                                        <tr>
                                            <th className='PriceHeader'>Discount</th>
                                            <td className='CartTotalPrices'>₹ {discount}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th className='TotalAmount'>Total Amount</th>
                                            <td className='CartTotalFinalPrice'>₹ {totalAmount}</td>
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
export default Saveforlater
