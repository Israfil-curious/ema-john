import React from 'react';
import './Cart.css'
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const {cart} = props;
    let total = 0;
    for(let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }
    return (
        <div>
            <h4>Order summery</h4>
            <h5>Items: {cart.length}</h5>
            <p>Total Price: ${total}</p>
            <Link to="/review">
                <button>Review Orders</button>
            </Link>
        </div>
    );
};

export default Cart;