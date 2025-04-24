

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteLogo from "../assets/Delete.png";
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {

   
const [showProduct, setShowProduct] = useState([]);
const [saveforlater, setSaveforlater] = useState([]);

    const [userId, setUserId] = useState(null);

 const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userIdFromLocalStorage = parsedUser ? parsedUser.mobilenumber : null;
    const [user, setUser] = useState(parsedUser);

const fetchProducts = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/cart`);
        setShowProduct(response.data.map(item => ({ ...item, quantity: item.quantity || 1 })));
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};

useEffect(() => {
    fetchProducts();
}, []);

const handleDelete = async (id) => {
    console.log("Deleting item with ID:", id);
    try {
        await axios.delete(`http://localhost:5000/cart/${id}`);
        toast.success("Product removed from cart successfully!");

        // Re-fetch updated product list
        fetchProducts();
    } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Failed to remove product from cart. Please try again.");
    }
};

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
       


const Saveforlater = async(item) => {
    if (!userId) {
        toast.error("Please log in to add to cart.");
        return;
    }
    try{
        const existingSavedResponse = await axios.get(`http://localhost:5000/saveforlater?user_id=${userId}`);
        const existingSaved = existingSavedResponse.data;
        
        const isProductInSaved = existingSaved.some((savedItem) => savedItem.product_id === item.id);
        
        if (isProductInSaved) {
            toast.error("Product already in Save for later.");
            return;
        }
        const response = await axios.post(`http://localhost:5000/saveforlater`, {
            product_id: item.id,
            user_id: userId,
            ProductName: item.ProductName,
            ProductPrice: item.ProductPrice,
            ProductImage: item.ProductImage,
            RestaurantId: item.RestaurantId
        });
        console.log("Added to save for later:", response.data);
        toast.success("Added to save for later successfully");
         setSaveforlater(response.data);


    }
    catch (error) {
        console.error('Error adding to save for later:', error);
        toast.error('Failed to add to save for later. Please try again.');
    }

}


    const handleQuantityChange = (id, type) => {
        setShowProduct(prev =>
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

    

    const totalMRP = showProduct.reduce((sum, item) => {
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
                            <div className="contact-us">Cart</div>
                            <Link className='homelink' to="/">Home</Link>
                            <span className='CategorySlash'>/</span>
                            <Link className='CategoryLink'>Category</Link>
                            <span className='Checkout'>/</span>
                            <Link className='Checkout'>Cart</Link>
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
                                    {showProduct.length > 0 ? (
                                        showProduct.map((item) => (
                                            
                                            
                                            <tr key={item.id}>
                                                <td><img width={80} height={80} className='rounded-4' src={item.ProductImage} alt="product" /></td>
                                                <td>
                                                    <p>{item.ProductName}</p>
                                                    <button type='button' className='btn btn-danger SavedInCart' onClick={() => Saveforlater(item)}>Save for Later</button>
                                                </td>
                                                <td><p>₹ {item.ProductPrice}</p></td>

                                                <td><p>5%</p></td>
                                                <td>
                                                    <div className='card spinButtonInTable'>
                                                        <button type='button' className='btn spinInnerButton' onClick={() => handleQuantityChange(item.id, 'dec')}>-</button>
                                                        <span className='spinNumber'>{item.quantity}</span>
                                                        <button type='button' className='btn spinInnerButton' onClick={() => handleQuantityChange(item.id, 'inc')}>+</button>
                                                    </div>

                                                </td>
                                                <td>
                                                <p>₹ {Number(item.ProductPrice) * (1 + TAX_RATE) * item.quantity}</p>

                                                </td>
                                                <td>
                                                    <button type='button' className='btn' onClick={() => handleDelete(item.id)}  >
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

                        <div className='col-lg-4 col-md-4 col-sm-12 col-12 mb-5'>
                            <div className='card CardCartTotal'>
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
                                            <th className='PriceHeader'>MRP ({showProduct.length} items)</th>
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
    );
};

export default Cart;
