import React from 'react';
import './ReviewItems.css';

const ReviewItems = (props) => {
    const {name, quantity, img, key} = props.product; 
    return (
        <div>
            <div className="review-item">
                <img src={img} alt=""/>
                <div>
                    <h2>{name}</h2>
                    <p>Quantity: {quantity}</p>
                    <button onClick={() => props.removeItem(key)}>Remove</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;