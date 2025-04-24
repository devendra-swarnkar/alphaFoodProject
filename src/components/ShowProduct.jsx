import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CartRedLogo from '../assets/CartRedLogo.png'
import { toast } from 'react-toastify';

const ShowProduct = () => {

    const { id } = useParams();

    const [showProduct, setShowProduct] = useState([]);


     const [userId, setUserId] = useState(null);
    
        const storedUser = localStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const userIdFromLocalStorage = parsedUser ? parsedUser.mobilenumber : null;
        const [user, setUser] = useState(parsedUser);
        const [cart, setCart] = useState([]);

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


    const AddtoCart = async(product) => {
        if (!userId) {
            toast.error("Please log in to add to cart.");
            return;
        }
        try {
            const existingCartResponse = await axios.get(`http://localhost:5000/cart?user_id=${userId}`);
            const existingCart = existingCartResponse.data;
            const isProductInCart = existingCart.some((item) => item.product_id === product.id);
            if (isProductInCart) {
                toast.error("Product already in cart.");
                return;
            }
            const response = await axios.post(`http://localhost:5000/cart`, {
                product_id: product.id,
                user_id: userId,
                ProductName: product.ProductName,
                ProductPrice: product.ProductPrice,
                ProductImage: product.ProductImage,
                RestaurantId: product.RestaurantId
            });
            console.log("Added to cart:", response.data);
            toast.success("Added to cart successfully");

            setCart(response.data);
            } catch (error) {
                console.error('Error adding to cart:', error);
                toast.error('Failed to add to cart. Please try again.');
                }
    }

    const ProductData = async () => {
        try {
            const productResponse = await axios.get(`http://localhost:5000/Product`)
            const productData = productResponse.data;
            const filteredProducts = productData.filter(
                (item) => item.RestaurantId?.toString() === id
                
            );
            setShowProduct(filteredProducts)
            toast.error("You have can not add any product")

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        ProductData();
    }, [id]); 
    
    return (
        <>
            <section className='custom-section '>
                <div className="container-fluid px-0">
                    <div className="row ContactContent ">
                        <div className='col-lg-12 col-md-12  col-sm-12  col-12 '>
                            <div className="contact-us">Category</div>
                            <Link className=' homelink' to="/">Home </Link>
                            <span className='Checkout mx-3'>/</span>
                            <Link className='Checkout' to="/ShowProduct" >Category</Link>

                        </div>
                    </div>
                </div>
            </section>
            <section className='custom-section'>
                <div className="container">
                    <h5 className='ProductsHeader'>Products</h5>
                </div>
                </section>
            <section >
                <div className="container">
                    <div className="row">
                        {showProduct.length > 0 ? (
                            showProduct.map((item, index) => (
                                <div className="col-4 my-3" key={index}>
                                    <div className="card ShowProductCard">
                                        <img
                                            src={item.ProductImage}
                                            className="card-img-top RestaurantImageInCardInShowProduct"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title ProductNameShow">{item.ProductName}</h5>
                                            <div className='d-flex justify-content-between'>
                                                
                                                <p className="card-text ProductPriceShow">₹{item.ProductPrice}</p>
                                                
                                                <button type="button" className="btn btn-outline-danger RedAddtoCart "  onClick={() => AddtoCart(item)}>
                                                    <img src={CartRedLogo} className='mx-2 my-1' alt="" />Add to Cart
                                                </button>
                                                
                                                
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </div>
                </div>
            </section>

        </>
    )
}
export default ShowProduct