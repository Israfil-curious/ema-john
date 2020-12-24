import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product'

const Shop = () => {
    console.log(fakeData);

    const first10 = fakeData.slice(0,10);
    const [products, setProduct] = useState(first10);

    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) =>{
        console.log("Cliked me", product);
    }

    return (
        <div className="shop-container">

            <div className="product-container">
                <ul>
                    {
                        products.map(pd => <Product handleAddProduct={handleAddProduct} product={pd}></Product>)
                    }
                </ul>
            </div>

            <div>
                <h1>this is cart</h1>
            </div>
        </div>
    );
};

export default Shop;