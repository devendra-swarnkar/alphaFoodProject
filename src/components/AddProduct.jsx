import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const AddProduct = () => {

    const {id} = useParams();
    console.log(id)
    const [response, setResponse] = useState({
        ProductName: "",
        ProductPrice: "",
        ProductCategory: "",
        ProductImage: ""
    });
    const handleChange = (e) => {
        setResponse({ ...response, [e.target.name]: e.target.value });
    };

  
    // const [restaurantId, setRestaurantId] = useState(null);

    // useEffect(() => {
    //     const fetchRestaurantId = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/AddRestaurant');
    //             const restaurantData = response.data;
    //             const restaurantId = restaurantData.map((item) => item.id);
    //             setRestaurantId(restaurantId);
    //             console.log(restaurantId);
    //         } catch (error) {
    //             console.error(error);
    //             }
    //     };
    //     fetchRestaurantId();
    //     }, []);

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
                    ProductImage: base64
                  }));
                }
              };


    const AddProductData = async (e) => {
        if (e) e.preventDefault();
         if (!response.ProductName || !response.ProductPrice || !response.ProductCategory || !response.ProductImage) {
                    toast.error("Please fill all required fields.");
                    return;
                }
        try {
            await axios.post(`http://localhost:5000/Product`, {
                ProductName: response.ProductName,
                RestaurantId: id,
                ProductPrice: response.ProductPrice,
                ProductCategory: response.ProductCategory,
                ProductImage: response.ProductImage
            });
            toast.success("Product Added Successfully")
            setResponse({
                ProductName: "",
                ProductPrice: "",
                ProductCategory: "",
                ProductImage: "",
            });
        }
        catch (err) {
            console.log(err);
            toast.error("Error in Adding Product")
        }
    }



    return (
        <>
            <section className='custom-section '>
                <div className="container-fluid px-0">
                    <div className="row ContactContent ">
                        <div className='col-lg-12 col-md-12  col-sm-12  col-12 '>
                            <div className="contact-us">Add Product Data</div>
                            <Link className=' homelink' to="/">Home </Link>
                            <span className='Checkout mx-3'>/</span>
                            <Link className='Checkout' to="/CreateRestaurant" >Create Restaurant</Link>
                            <span className='Checkout mx-2'>/</span>
                            <Link className='Checkout' >Add Product</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="custom-container">
                <div className="container  text-center my-4 w-50">
                    <div className="input-group mt-5  ">
                        <span className="input-group-text">Product name</span>
                        <input type="text" aria-label="First name" className="form-control" name='ProductName' onChange={handleChange} value={response.ProductName} required />
                    </div>
                    <div className="input-group  my-4 ">
                        <span className="input-group-text">₹</span>
                        <input type="text" className="form-control" aria-label="Rupee amount (with dot and two decimal places)" name='ProductPrice' onChange={handleChange} value={response.ProductPrice} required/>
                    </div>
                    <div className="input-group my-3 ">
                        <label className="input-group-text" for="inputGroupSelect01">Product Category</label>
                        <select className="form-select" id="inputGroupSelect01" name='ProductCategory' onChange={handleChange} value={response.ProductCategory} required>
                            <option selected>Choose...</option>
                            <option value="Veg&NonVeg">Veg & Non Veg</option>
                            <option value="NonVeg">Non Veg</option>
                            <option value="PureVeg">Pure Veg</option>
                        </select>
                    </div>
                    <div className="input-group my-3 ">
                        <input type="file" className="form-control" id="inputGroupFile02" name='ProductImage' onChange={handleFileChange} required  />
                        <label className="input-group-text" for="inputGroupFile02" >Upload</label>
                    </div>

                    <div className='d-flex justify-content-end'>
                        <button type='button' className='btn btn-dark NextButtonInRestaurant px-5' onClick={AddProductData} onChange={handleChange} >Add Product</button>
                    </div>


                </div>
            </section>
        </>
    )
}
export default AddProduct