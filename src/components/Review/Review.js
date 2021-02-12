import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';
import "./Review.css"

const Review = () => {
    const [cart, setCart] = useState([]);

    const removeItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd =>  pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
        
    },[])

    const history = useHistory();

    const handlePlaceOrder = () => {
        history.push("/Shipment");
    }

    console.log(cart);
    return (
        <div className="review">
           <div className="reviewItems">
           <h1>this is cart {cart.length}</h1>
            {
                cart.map(product => <ReviewItems  removeItem={removeItem} product={product}></ReviewItems>)
            }
           </div>

            <div className="control">
                <button onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
};

export default Review;